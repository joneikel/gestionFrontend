import { Button, Card, Col, Form, Input, message, Row } from "antd";
import { useState } from "react";
import { useAxios } from "../../../hooks/useAxios";
import { AxiosInstance } from "axios";
import { useForm } from "antd/lib/form/Form";
import UserContainer from "../../../unstated/UserContainer";
import CustomPageHeader from "../../../components/PageHeader";

const MisionAndVisionForm = () => {
    const axios = useAxios();
    const [form] = useForm();
    const userState = UserContainer.useContainer();
    const [visible, setVisible] = useState(false);

    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (values: any) => {
        values.name = userState.user?.institution.name;
        console.log(values);
        setLoading(true);
        try {
            const response = await updateInstitution(values, userState.user?.institution.id ? userState.user.institution.id : '', axios);
            message.success('Misión y visión Actualizadas');
            return response;
        } catch (error:any) {
            message.error("Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        
            <Card title={<CustomPageHeader title="Actualizar Misión y Visión" />} className="floating-element">
               <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={ userState.user?.institution?.mision && userState.user?.institution.vision ? {
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
                                {userState.user?.institution?.name.toUpperCase()}
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
                                {userState.user?.institution?.mision && userState.user?.institution?.vision ? "Actualizar" : "Guardar"}
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form> 
            </Card>
            
    );
};

async function updateInstitution(values: any, id: string, axios: AxiosInstance) {
    const response = await axios.patch(`/institution/${id}`, values);
    return response;
}

export default MisionAndVisionForm;
