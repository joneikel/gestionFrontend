import { Button, Modal, Tooltip, Form, Space, message, Input, DatePicker } from 'antd';
import React, { useState } from 'react';
import { PlusCircleFilled } from '@ant-design/icons';
import ImputMeasurementUnit from './ImputMeasurementUnit';
import { useAxios } from '../../../hooks/useAxios';
const ModifyCulminationDateModal = ({ previousDate, onChange, project_id }: { previousDate?: string, onChange: Function ,project_id: string }) => {

    const axios = useAxios();

    const [loading, setLoading] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);

    const handleSubmit = (values: any) => {


        console.log(values);

        setLoading(true);
        axios
            .post('project/modify-culmination-date', {
                project_id: project_id,
                modified_culmination_date: values.modified_culmination_date,
                observation: values.observation
            }).then((update_project) => {
                message.success("Metas Actualizadas exitosamente")
                onChange(update_project.data);
                setVisible(false);
            }).catch(error => {
                message.error("Ha ocurrido un error");
            }).finally(() => setLoading(false)); 
    }

    return (
        <>
            <Modal
                title="Modificar fecha de culminación"
                visible={visible}
                footer={null}
                onCancel={() => setVisible(false)}
                width='60vw'
            >
                <Form
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        hasFeedback
                        label="Nueva fecha de culminación"
                        key="modified_culmination_date"
                        name="modified_culmination_date"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Debes elegir un nueva fecha de culmination",
                            },
                        ]}
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="Justificación"
                        name="observation"
                        key="observation"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Justifique el cambio de fecha de culminación",
                            },
                        ]}
                    >
                        <Input/>
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
            <Tooltip title="Modificar fecha de culminacion">
                <Button
                    shape="circle"
                    type="primary"
                    icon={<PlusCircleFilled />}
                    onClick={() => setVisible(true)}
                    loading={loading}
                />
            </Tooltip>
        </>
    )
}

export default ModifyCulminationDateModal;