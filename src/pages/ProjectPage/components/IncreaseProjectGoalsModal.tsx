import { Button, Modal, Tooltip } from 'antd';
import React, { useState } from 'react';
import { PlusCircleFilled } from '@ant-design/icons';
const IncreaseProjectGoalsModal = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <>
            <Modal
                title="Expandir metas del Poyecto"
                visible={visible}
                footer={null}
                onCancel={() => setVisible(false)}
            >

            </Modal>
            <Tooltip title="Incrementar presupuesto">
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