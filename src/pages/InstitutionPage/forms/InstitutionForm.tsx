import { Button, Col, Form, Input, message, Row } from "antd";
import React, { useState } from "react";
import InstitutionsSelect from "../../ActivityPage/components/InstitutionSelect";
import { useAxios } from "../../../hooks/useAxios";
import { useHistory } from "react-router-dom";

const InstitutionForm = () => {

    const axios = useAxios();
    const history = useHistory();

    const [parentInstitution, setParentInstitution] = useState<string | undefined>();
    const [loading,setLoading] = useState<boolean>(false);

    const handleSubmit = async (values: any) => {
        console.log(values);
    setLoading(true);
    try {
        const response = await axios.post('institution', values);
        message.success("Institución creada.");
        history.push('/nueva-secretaría');
        return response;
    } catch (error) {
        message.error("No Se puedo crear el la institución.");
    }  finally {
        setLoading(false);
    }};


    
    
    return (
        <>
        <h1>Nueva Secretaría</h1><br/>
        <Form layout="vertical" onFinish={handleSubmit}>
            <Row gutter={10}>
                <Col span={12}>
                    <Form.Item
                        hasFeedback
                        name="parentId"
                        label="Secretaria Ejecutiva a la que pertence"
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
                        name="name"
                        label="Nombre de la institución"
                        rules={[
                        {
                            required: true,
                            message: "Debes indicar el nombre de la institución.",
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

export default InstitutionForm;