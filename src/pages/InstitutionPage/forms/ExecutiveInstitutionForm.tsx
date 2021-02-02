import { Button, Col, Form, Input, message, Row } from "antd";
import React, { useState } from "react";
import { useAxios } from "../../../hooks/useAxios";
import { useHistory } from "react-router-dom";

const ExecutiveInstitutionForm = () => {

    const axios = useAxios();
    const history = useHistory();

    const [loading,setLoading] = useState<boolean>(false);

    const handleSubmit = async (values: any) => {
        console.log(values);
    setLoading(true);
    try {
        values = {...values, }
        const response = await axios.post('institution', values);
        message.success("Secreataría ejecutiva creada.");
        history.push('/nueva-actividad');
        return response;
    } catch (error) {
        message.error("No Se puedo crear la secretaría ejecutiva.");
    }  finally {
        setLoading(false);
    }};
    
    return (
        <>
        <h1>Nueva Secretaría Ejectutiva</h1><br/>
        <Form layout="vertical" onFinish={handleSubmit}>
            <Row gutter={10}>
                <Col span={12}>
                    <Form.Item
                        hasFeedback
                        name="name"
                        label="Nombre de la Secretaría Ejecutiva."
                        rules={[
                        {
                            required: true,
                            message: "Debes indicar el nombre de la Secretaría Ejecutiva.",
                        },
                        ]}>
                        <Input />
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

export default ExecutiveInstitutionForm;