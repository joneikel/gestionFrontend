import { Button, Form, Input, message, Modal, Space, Tag, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useAxios } from '../../../hooks/useAxios';
import { ProjectStatus } from '../../../models';
import ProjectStatusSelect from './ProjectStatusSelect';

const UpdateProjectStatusModal = ({ project_status, project_id, onChange, authorization }: { project_status: ProjectStatus, project_id: string, onChange: Function, authorization?:boolean }) => {

    const axios = useAxios();
    const [visible, setVisible] = useState<boolean>(false);
    const [selectedStatus, setSelectedStatus] = useState<string | undefined>();
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (values: any) => {
        setLoading(true);

        axios
            .patch('/project/update-status', {
                project_id: project_id,
                project_status_id: values.project_status_id,
                observation: values.observation
            }).then((new_status) => {
                message.success("Status actualizado con exito");
                onChange(new_status.data);
                setVisible(false);

            }).catch(() => {
                message.error("Ha ocurrido un error");
            }).finally(() => setLoading(false));

    }

    return (
        <>
            <Modal
                title="Cambiar status del Proyecto"
                visible={visible && authorization}
                footer={null}
                destroyOnClose={true}
                onCancel={() => setVisible(false)}
                confirmLoading={loading}
            >

                <Form
                    onFinish={handleSubmit}
                >
                    <span>Seleccione el nuevo status</span>
                    <Form.Item
                        hasFeedback
                        name='project_status_id'
                        key='project_status_id'
                        rules={[
                            {
                                required: true,
                                message: 'Debe seleccionar el nuevo status del proyecto'
                            },
                        ]}
                    >
                        <ProjectStatusSelect onChange={(v: string) => setSelectedStatus(v)} />
                    </Form.Item>
                    <span>Observación</span>
                    <Form.Item
                        hasFeedback
                        name='observation'
                        key='observation'
                        rules={[
                            {
                                required: true,
                                message: 'Justifique el cambio de status'
                            },

                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Space align='start'>
                        <Button
                            color='red'
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
            <Tooltip title="Actualizar status del proyecto">
                {project_status.is_final ?
                <Tag className="project-status-tag" color="red" onChange={() => setVisible(!visible)}>{project_status.name}</Tag > :
                <Tag className="project-status-tag" color="#40bf22" onClick={() => setVisible(!visible)} >{project_status.name}</Tag>}
            </Tooltip>
            
        </>
    )
}

export default UpdateProjectStatusModal;