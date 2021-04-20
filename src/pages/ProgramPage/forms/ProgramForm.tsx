import { Button, Card, Col, Form, Input, message, Row } from "antd";
import React, { useState } from "react";
import InstitutionsSelect from "../../ActivityPage/components/InstitutionSelect";
import { useAxios } from "../../../hooks/useAxios";
import { useHistory } from "react-router-dom";
import CustomPageHeader from "../../../components/PageHeader";

const ProgramForm = () => {

    const axios = useAxios();
    const history = useHistory();
    const _program : any = history.location.state;

    const [parentInstitution, setParentInstitution] = useState<string | undefined>(
        _program?.institution.parent_id
    );

    const currentInstitution = _program?.institution_id;

    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (values: any) => {
        console.log(values);
        setLoading(true);
        try {
            const response = await axios.post(`program${ _program ? `-update/${_program.id}` : ''}`, values);
            message.success(`Programa ${ _program ? `actualizado` : 'creado'}`);
            history.push('/listar-programas');
            return response;
        } catch (error) {
            message.error(`No Se puedo ${ _program ? `actualizar` : 'crear'} el programa`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title={<CustomPageHeader title="Nuevo programa" />} className="floating-element">
            <Form 
            initialValues={_program ? {
                parent_institution: _program.institution.parent_id,
                institution_id: _program.institution_id,
                name: _program.name,
                description: _program.description
            } : {}}
            layout="vertical" 
            onFinish={handleSubmit}>
                <Row gutter={10}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                            hasFeedback
                            name="parent_institution"
                            label="Secretaria Ejecutiva"
                            rules={[
                                {
                                    required: true,
                                    message: "Debes seleccionar secretaría ejecutiva.",
                                },
                            ]}>
                            <InstitutionsSelect onlyParent initial_value={parentInstitution} onChange={setParentInstitution} />
                        </Form.Item>
                    </Col>

                    <Col lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                            hasFeedback
                            name="institution_id"
                            label="Institucion"
                            rules={[
                                {
                                    required: true,
                                    message: "Debes seleccionar una secretaría",
                                },
                            ]}
                        >
                            <InstitutionsSelect
                                initial_value={currentInstitution}
                                disabled={!parentInstitution}
                                parentId={parentInstitution}
                                onChange={(v:any) => console.log(v)}
                            />
                        </Form.Item>
                    </Col>

                    <Col lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                            hasFeedback
                            name="name"
                            label="Nombre del Programa"
                            rules={[
                                {
                                    required: true,
                                    message: "Debes indicar nombre del programa",
                                },
                            ]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            hasFeedback
                            name="description"
                            label="Descripción del programa"
                            rules={[
                                {
                                    required: true,
                                    message: "Escribe una breve descripción del programa.",
                                },
                            ]}>
                            <Input.TextArea rows={3} />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading} >
                                Guardar
                        </Button>
                        </Form.Item>
                    </Col>

                </Row>
            </Form>
        </Card>
    );
}

export default ProgramForm;