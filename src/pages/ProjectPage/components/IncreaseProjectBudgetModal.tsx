import { Button, Form, Input, message, Modal, Space, Tooltip } from 'antd';
import React, { useState } from 'react';
import { PlusCircleFilled } from "@ant-design/icons";
import BudgetSourceSelector from './BudgetSourceSelector';
import { useAxios } from '../../../hooks/useAxios';

const IncreaseProjectBudgetModal = ({ project_id, onChange }: { project_id: string, onChange: Function }) => {

    const axios = useAxios();

    const [visible, setVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (values: any) => {
        setLoading(true);
        axios
            .post('project/budget-increase', {
                project_id: project_id,
                value: Number(values.value),
                dollar_value: Number(values.dollar_value),
                budget_source_id: values.budget_source_id,
                observation: values.observation
            }).then((update_project) => {
                message.success("Presupuesto aumentado exitosamente")
                onChange(update_project.data);
                setVisible(false);
            }).catch(error => {
                message.error("Ha ocurrido un error");
            }).finally(() => setLoading(false));
    }

    return (
        <>
            <Modal
                title="Añadir aumento de presupuesto"
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={null}
                destroyOnClose={true}
                confirmLoading={loading}
            >
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
                        <Input placeholder="Cantidad en Bs" />
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        name="dollar_value"
                        key="dollar_value"
                        rules={[
                            {
                                required: true,
                                message: "Introduzca el valor en $ del incremento de presupuesto"
                            }
                        ]}
                    >
                        <Input placeholder="Cantidad en $" />
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        name="budget_source_id"
                        key="budget_source_id"
                        rules={[
                            {
                                required: true,
                                message: "Debe seleccionar el origen del presupuesto"
                            }
                        ]}
                    >
                        <BudgetSourceSelector />
                    </Form.Item>

                    <Form.Item
                        hasFeedback
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
                                htmlType='submit'
                                type='primary'
                            >
                                Guardar
                            </Button>
                        </Form.Item>

                    </Space>
                </Form>

            </Modal>
            <Tooltip title="Añadir aumento de presupuesto" >
               <Button
                    shape="circle"
                    type="primary"
                    onClick={() => setVisible(true)}
                    icon={<PlusCircleFilled />}
                /> 
            </Tooltip>
            
        </>
    )
}

export default IncreaseProjectBudgetModal;