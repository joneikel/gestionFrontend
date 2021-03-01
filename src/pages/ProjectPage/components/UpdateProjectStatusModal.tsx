import { Form, Input, message, Modal, Tag } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { AsyncResource } from 'async_hooks';
import { AxiosInstance } from 'axios';
import { AnyNaptrRecord } from 'dns';
import React, { useState } from 'react';
import { useAxios } from '../../../hooks/useAxios';
import { ProjectStatus } from '../../../models';
import ProjectStatusSelect from './ProjectStatusSelect';

const UpdateProjectStatusModal = ({ project_status, project_id, onChange }: { project_status: ProjectStatus, project_id: string, onChange: Function }) => {

    const axios = useAxios();
    const [form] = useForm(); 
    const [visible, setVisible] = useState<boolean>(false);
    const [selectedStatus,setSelectedStatus] = useState<string|undefined>();
    const [loading,setLoading] = useState<boolean>(false);

    const handleSubmit = async (values:any) => {
        setLoading(true);
        form.validateFields()
        .then((v) => {
            try {
                const response = UpdateProjectStatus(project_id,axios,values.project_status_id,values.observation);
                message.success("Status actualizado con exito");
                return response;
            } catch (error) {
                message.error("Ha ocurrido un error");
            }
        }).catch((e) => {
            console.log(e);
            message.error('No se pudo actualizar el status');
        })
        .finally(() => setLoading(false));

    }


    return (
        <>
            <Modal
                title="Cambiar status del Proyecto"
                visible={visible}
                onCancel={() => setVisible(!visible)} 
                onOk={() => handleSubmit(form.getFieldsValue(true))}
            >
                
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    >
                    <span>Seleccione el nuevo status</span>
                    <Form.Item
                        hasFeedback
                        name='project_status_id'
                        key='project_status_id'
                        rules={[
                            {
                                required:true,
                                message: 'Debe seleccionar el nuevo status del proyecto'
                            },
                        ]}
                    >
                        <ProjectStatusSelect onChange={(v:string) => setSelectedStatus(v)} />
                    </Form.Item>
                    <span>Observación</span>
                    <Form.Item
                        hasFeedback
                        name='observation'
                        key='observation'
                        rules={[
                            {
                                required:true,
                                message: 'Justifique el cambio de status'
                            },

                        ]}
                    >
                        <Input/>
                    </Form.Item>
                </Form>

            </Modal>
            {project_status.is_final ?
                <Tag className="project-status-tag" color="red" onChange={() => setVisible(!visible)} >{project_status.name}</Tag > : <Tag className="project-status-tag" color="green" onClick={() => setVisible(!visible)} >{project_status.name}</Tag>}
        </>
    )
}

export default UpdateProjectStatusModal;

async function UpdateProjectStatus(project_id:string,axios:AxiosInstance,project_status_id:string,observation:string){
    const response = await axios.patch('/project/update-status', {
        params: {
            project_id: project_id,
            project_status_id: project_status_id,
            observation: observation
        }
    });

    return response;
}