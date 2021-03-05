import { Button, Modal } from 'antd';
import React, { useState } from 'react';

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
            <Button
                onClick={() => setVisible(true)}
            >
                Expandir metas
            </Button>
        </>
    )
}

export default IncreaseProjectGoalsModal;