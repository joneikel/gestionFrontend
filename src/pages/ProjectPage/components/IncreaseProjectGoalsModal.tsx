import { Button, Modal, Tooltip, Form, Space } from 'antd';
import React, { useState } from 'react';
import { PlusCircleFilled } from '@ant-design/icons';
import ImputMeasurementUnit from './ImputMeasurementUnit';
const IncreaseProjectGoalsModal = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);

    const handleSubmit = () => {

    }

    return (
        <>
            <Modal
                title="Expandir metas del Poyecto"
                visible={visible}
                footer={null}
                onCancel={() => setVisible(false)}
                width='60vw'
            >
                <Form>
                   <Form.Item
                    hasFeedback
                    name="measurement"
                    rules={[
                        {
                        required: true,
                        message:
                            "Debes indicar la unidad de medida",
                        },
                    ]}
                    >
                        <ImputMeasurementUnit />
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
            <Tooltip title="Añadir nueva meta al proyecto">
                <Button
                    shape="circle"
                    type="primary"
                    icon={<PlusCircleFilled />}
                    onClick={() => setVisible(true)}
                />
            </Tooltip>
        </>
    )
}

export default IncreaseProjectGoalsModal;