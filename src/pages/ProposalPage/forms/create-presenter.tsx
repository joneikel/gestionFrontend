import { Button, Col, Form, Input, message, Row, Typography } from 'antd';
import { useState } from 'react';
import { useAxios } from '../../../hooks/useAxios';
import { PresenterTypeSelect } from '../../ProjectPage/components/PresenterTypeSelect';

export function CreatePresenterForm() {

    const axios = useAxios();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (values: any) => {
        setLoading(true);
        axios.post('/presenter', values)
            .then(res => {
                message.success('Presentante creado');
                form.resetFields();
            })
            .catch(err => {
                message.error('Error al crear el presentante');
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return <>
        <Typography.Title>Nuevo presentante</Typography.Title>
        <Form
            form={form}
            layout="vertical" onFinish={handleSubmit}>
            <Row gutter={2}>
                <Col span={12}>
                    <Form.Item
                        rules={[{ required: true, message: 'Debe ingresar el tipo de presentante' }]}
                        name="presenter_type_id" label="Tipo de presentante">
                        <PresenterTypeSelect />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        rules={[{ required: true, message: 'Por favor ingrese el nombre del presentante' }]}
                        label="Nombre" name="name">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="identification"
                        label="Cedula del representante">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        rules={[{ required: true, message: 'Por favor ingrese el nombre y apellido del presentante' }]}
                        name="fullname"
                        label="Nombre y apellido del representante">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="charge"
                        rules={[{ required: true, message: 'Por favor ingrese el cargo del presentante' }]}
                        label="Responsabilidad o cargo del representante">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="address"
                        rules={[{ required: true, message: 'Por favor ingrese la dirección del presentante' }]}
                        label="Direccion">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="phone"
                        rules={[{ required: true, message: 'Por favor ingrese el número de telefono del presentante' }]}
                        label="Telefonos de contacto">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="email"
                        label="Correo electronico">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Button loading={loading} type="primary" htmlType="submit">Guardar</Button>
                </Col>
            </Row>
        </Form>
    </>
}