import { Button, Col, Form, Input, message, Row } from "antd";
import React, { useState } from "react";
import InstitutionsSelect from "../../ActivityPage/components/InstitutionSelect";
import { useAxios } from "../../../hooks/useAxios";

const ProgramForm = () => {

    const axios = useAxios();
    const [loading,setLoading] = useState<boolean>(false);

    const handleSubmit = async (values: any) => {
        console.log(values);
    setLoading(true);
    try {
        const response = await axios.post('program', values);
        message.success("Programa creado.")
        return response;
    } catch (error) {
        message.error("No Se puedo crear el programa,");
    }  finally {
        setLoading(false);
    }
    
    };


    
    const [parentInstitution, setParentInstitution] = useState<string | undefined>();
    return (
        <>
        <h1>Nuevo Programa</h1><br/>
        <Form layout="vertical" onFinish={handleSubmit}>
            <Row gutter={10}>
                <Col span={12}>
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
                        <InstitutionsSelect onlyParent onChange={setParentInstitution} />
                    </Form.Item>
                </Col>
                
                <Col span={12}>
                    <Form.Item
                    hasFeedback
                    name="institution"
                    label="Institucion"
                    rules={[
                    {
                        required: true,
                        message: "Debes seleccionar una secretaría.",
                    },
                    ]}
                    >
                    <InstitutionsSelect
                    disabled={!parentInstitution}
                    parentId={parentInstitution}
                    onChange={setParentInstitution}
                    />
                    </Form.Item>
                </Col>
               
                <Col span={12}>
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
        </>
    );
}

export default ProgramForm;