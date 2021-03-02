import { Button, Form, Input, message, Modal, Space } from 'antd';
import React, { useState } from 'react';
import { PlusOutlined } from "@ant-design/icons";
import BudgetSourceSelector from './BudgetSourceSelector';
import { useAxios } from '../../../hooks/useAxios';

const IncreaseProjectBudgetModal = ({project_id,onChange}:{project_id:string,onChange:Function}) => {

    const axios = useAxios();
    
    const [visible, setVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = (values:any) => {
        setLoading(true);
        try {
            axios.patch('/budget-increase',{
                project_id: project_id,
                value: values.value,
                budget_source_id: values.budget_source_id,
                observation: values.observation
            }).then((update_project) => {
                onChange && onChange(update_project.data);
                message.success("Presupuesto aumentado exitosamente")
            })
        } catch (error) {
            console.log(error);
            message.error("Hay ocurrido un error");
        } finally {
            setLoading(false);
        } 
    }

    return (
        <>
            <Modal
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <h2>Añadir aumento de presupuesto</h2>
                <Form
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        hasFeedback
                        name="value"
                        key="value"
                        rules={[
                            {
                                required: true,
                                message: "Introduzca el valor del incremento de presupuesto"
                            }
                        ]}
                    >
                        <Input placeholder="Valor de presupuesto" />
                    </Form.Item>

                    <Form.Item
                        name="budget_source_id"
                        key="budget_source_id"
                        rules={[
                            {
                                required: true,
                                message: "Debe seleccionar el origen del presupuesto"
                            }
                        ]}
                    >
                        <BudgetSourceSelector/>
                    </Form.Item>

                    <Form.Item
                        name="observation"
                        key="observation"
                        rules={[
                            {
                                required: true,
                                message: "Debe justificar el aumento de presupuesto"
                            }
                        ]}
                    >
                        <Input.TextArea rows={3} placeholder="Justifique el aumento de presupuesto" />
                    </Form.Item>
                    
                    <Space
                        align="start"
                    >
                        <Button
                            onClick={() => setVisible(false)}
                        >
                            Cancelar
                            </Button>

                        <Form.Item>
                            <Button
                                htmlType="submit"
                                type="primary"
                            >
                                Guardar
                                </Button>
                        </Form.Item>

                    </Space>
                </Form>

            </Modal>
            <Button
                size="middle"
                onClick={() => setVisible(true)}
            >
                Aumento de presupuesto {<PlusOutlined />}
            </Button>
        </>
    )
}

export default IncreaseProjectBudgetModal;