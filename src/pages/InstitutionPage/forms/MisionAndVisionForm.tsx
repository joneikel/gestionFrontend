import { Button, Col, Form, Input, message, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import InstitutionsSelect from "../../ActivityPage/components/InstitutionSelect";
import { useAxios } from "../../../hooks/useAxios";
import { useParams } from "react-router-dom";
import { AxiosInstance } from "axios";
import { useForm } from "antd/lib/form/Form";
import UserContainer from "../../../unstated/UserContainer";

const MisionAndVisionForm = () => {
    const axios = useAxios();
    const [form] = useForm();
    const userState = UserContainer.useContainer();
    const [visible, setVisible] = useState(false);



    const [parentInstitution, setParentInstitution] = useState<string | undefined>(userState.user?.institution.parent_id);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (values: any) => {
        values.name = userState.user?.institution.name;
        console.log(values);
        setLoading(true);
        try {
            const response = await updateInstitution(values, userState.user?.institution.id ? userState.user.institution.id : '', axios);
            message.success('Misión y visión Actualizadas');
            return response;
        } catch (error) {
            message.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1>Actualizar Misión y Visión</h1>
            <br />
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={userState.user?.institution.mision && userState.user?.institution.vision ? {
                    mision: userState.user?.institution.mision,
                    vision: userState.user?.institution.vision
                } : {}}>
                <Row gutter={10}>
                    <Col span={24}>
                        <Form.Item
                            hasFeedback
                            name="institution_name"
                            label="Nombre de la institución"
                            rules={[
                                {
                                    required: false,
                                    message: "Debes indicar el nombre de la institución.",
                                },
                            ]}
                        >
                            <div className="mision-vision-form-field" >
                                {userState.user?.institution.name.toUpperCase()}
                            </div>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            hasFeedback
                            name="mision"
                            label="Mision de la institución"
                            rules={[
                                {
                                    required: true,
                                    message: "Debes indicar la misión de la institución.",
                                },
                            ]}
                        >
                            <Input.TextArea rows={3} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            hasFeedback
                            name="vision"
                            label="Vision de la institución"
                            rules={[
                                {
                                    required: true,
                                    message: "Debes indicar la visión de la institución.",
                                },
                            ]}
                        >
                            <Input.TextArea rows={3} />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                onClick={() => setVisible(!visible)}
                            >
                                {userState.user?.institution.mision && userState.user?.institution.vision ? "Actualizar" : "Guardar"}
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

async function updateInstitution(values: any, id: string, axios: AxiosInstance) {
    const response = await axios.patch(`/institution/${id}`, values);
    return response;
}

export default MisionAndVisionForm;
