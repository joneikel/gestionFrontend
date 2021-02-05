import { Button, Col, Form, Input, message, Row } from "antd";
import React, { useState } from "react";
import { useAxios } from "../../../hooks/useAxios";
import { useHistory } from "react-router-dom";

const MeasurementForm = () => {

    const axios = useAxios();
    const history = useHistory();
    const [loading,setLoading] = useState<boolean>(false);

    const handleSubmit = async (values: any) => {
        console.log(values);
    setLoading(true);
    try {
        const response = await axios.post('measurement', values);
        message.success("Unidad Creada.");
        history.push('/nueva-unidad-medida');
        return response;
    } catch (error) {
        message.error("Error, al crear unidad medida,");
    }  finally {
        setLoading(false);
    }};


    
    
    return (
        <>
        <h1>Nueva Unidad de Medida</h1><br/>
        <Form layout="vertical" onFinish={handleSubmit}>
            <Row gutter={10}>
                           
                <Col span={12}>
                    <Form.Item
                        hasFeedback
                        name="name"
                        label="Nombre Unidad de Medida"
                        rules={[
                        {
                            required: true,
                            message: "Debes indicar nombre de unidad de medida",
                        },
                        ]}>
                        <Input />                
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        hasFeedback
                        name= "shortName"
                        label= "Abreviación de unidad"
                        rules={[
                            {
                                required: true,
                                message: "Debes indicar abreviacion"
                            }
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

export default MeasurementForm;