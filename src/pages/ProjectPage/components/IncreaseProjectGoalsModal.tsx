import { Button, Modal, Tooltip, Form, Space, message, Input } from 'antd';
import React, { useState } from 'react';
import { PlusCircleFilled } from '@ant-design/icons';
import ImputMeasurementUnit from './ImputMeasurementUnit';
import { useAxios } from '../../../hooks/useAxios';
const IncreaseProjectGoalsModal = ({ selectedUnits, onChange, project_id }: { selectedUnits?: string[], onChange: Function ,project_id: string }) => {

    const axios = useAxios();

    const [loading, setLoading] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);

    const handleSubmit = (values: any) => {


        console.log(values);

        values.measurement = values.measurement.map((x: any) => ({ [x.measurement_unit_id]: { proposed_goal: Number(x.proposed_goal), reached_goal: Number(x.reached_goal) } }));

        values.measurement = values.measurement.reduce((x: any, y: any) => {
        x = { ...x, ...y };
      return x;
    })
        setLoading(true);
        axios
            .post('project/goals-increase', {
                project_id: project_id,
                measurement: values.measurement,
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
                title="Expandir metas del Poyecto"
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
                        name="measurement"
                        rules={[
                            {
                                required: true,
                                message:"Debes indicar la unidad de medida",
                            },
                        ]}
                    >
                        <ImputMeasurementUnit units={selectedUnits} />
                    </Form.Item>
                    <Form.Item
                        hasFeedback
                        name="observation"
                        rules={[
                            {
                                required: true,
                                message:"Justifique la ampliación de metas",
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
            <Tooltip title="Añadir nueva meta al proyecto">
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

export default IncreaseProjectGoalsModal;