import { Modal, Tag } from 'antd';
import React, { useState } from 'react';
import { ProjectStatus } from '../../../models';
import ProjectStatusSelect from './ProjectStatusSelect';

const UpdateProjectStatusModal = ({ project_status, project_id, onChange }: { project_status: ProjectStatus, project_id?: String, onChange: Function }) => {

    const [visible, setVisible] = useState<boolean>(false);



    return (
        <>
            <Modal
                title="Cambiar status del Proyecto"
                visible={visible}
                onCancel={() => setVisible(!visible)} 
            >
                <ProjectStatusSelect />
            </Modal>
            {project_status.is_final ?
                <Tag className="project-status-tag" color="red" onChange={() => setVisible(!visible)} >{project_status.name}</Tag > : <Tag className="project-status-tag" color="green" onClick={() => setVisible(!visible)} >{project_status.name}</Tag>}
        </>
    )
}

export default UpdateProjectStatusModal;