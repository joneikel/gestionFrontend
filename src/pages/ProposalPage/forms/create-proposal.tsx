import { Button, Col, Form, Input, message, Row, Typography } from 'antd';
import { useState } from 'react';
import { useAxios } from '../../../hooks/useAxios';
import MunicipiosSelect from '../../ActivityPage/components/MunicipioSelect';
import ParroquiaSelect from '../../ActivityPage/components/ParroquiaSelect';
import CoordinatesInput from '../../ActivityPage/forms/CoordinatesInput';
import InvestmentAreaSelect from '../../ProjectPage/components/InvesmentAreaSelect';
import InvestmentSubAreaSelect from '../../ProjectPage/components/InvestmentSubAreaSelect';
import { PresenterSelect } from '../../ProjectPage/components/PresenterSelect';
import { VerticeSelect } from '../../ProjectPage/components/VerticeSelect';

export function CreateProposalForm() {

    const [investmentAreas, setInvestmentAreas] = useState([]);
    const [municipio, setMunicipio] = useState<string | undefined>(undefined);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const axios = useAxios();

    const handleSubmit = (values: any) => {
        setLoading(true);
        axios.post('/proposals', values)
            .then(resp => {
                form.resetFields();
                message.success('Propuesta creada con éxito');
            })
            .catch(err => {
                message.error('Error al crear la propuesta');
            })
            .finally(() => setLoading(false));
    }

    return <>
        <Typography.Title>Nueva propuesta</Typography.Title>
        <Form
            onFinish={handleSubmit}
            layout="vertical"
            form={form}>
            <Row gutter={5}>
                <Col span={24}>
                    <Form.Item
                        rules={[{ required: true, message: 'Por favor ingrese el nombre de la propuesta' }]}
                        name="title"
                        label="Necesidad">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        rules={[{ required: true, message: 'Por favor ingrese el vertice' }]}
                        name="vertice_id"
                        label="Vertice">
                        <VerticeSelect />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        rules={[{ required: true, message: 'Por favor ingrese el/las area(s)' }]}
                        name="areas"
                        label="Areas">
                        <InvestmentAreaSelect mode="multiple" onChange={setInvestmentAreas} />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        rules={[{ required: true, message: 'Por favor ingrese el/las subarea(s)' }]}
                        name="investment_sub_areas"
                        label="Subareas">
                        <InvestmentSubAreaSelect mode="multiple" investmentAreaIds={investmentAreas} />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        rules={[{ required: true, message: 'Por favor ingrese el Presentante' }]}
                        name="presenter_id"
                        label="Presentante">
                        <PresenterSelect />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        rules={[{ required: true, message: 'Por favor ingrese el municipio' }]}
                        name="municipio_id"
                        label="Municipio">
                        <MunicipiosSelect onChange={setMunicipio} />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        rules={[{ required: true, message: 'Por favor ingrese la parroquia' }]}
                        name="parroquia_id"
                        label="Parroquia">
                        <ParroquiaSelect municipio_id={municipio} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        rules={[{ required: true, message: 'Por favor ingrese el sector' }]}
                        name="sector"
                        label="Sector">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24} style={{ height: 375, width: '100%' }}>
                    <Form.Item
                        rules={[{ required: true, message: 'Por favor ingrese las coordenadas' }]}
                        hasFeedback
                        name="geolocation"
                        label="Geolocalización"

                    >
                        <div style={{ height: 250, width: '100%' }}>
                            <CoordinatesInput
                                onChange={(latlng: any) => form.setFieldsValue({ geolocation: latlng })}
                            />
                        </div>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Button loading={loading} type="primary" htmlType="submit">Guardar</Button>
                </Col>
            </Row>
        </Form>
    </>
}