import { Button, Form, Input, message, Modal } from 'antd';
import { useState } from 'react';
import { useAxios } from '../../hooks/useAxios';
import { InvestmentArea } from '../../models';

export function SubAreaFormModal({ areaId, area, onSaved }: { areaId: string, area: InvestmentArea, onSaved: (area: InvestmentArea) => void }) {

    const [open, setOpen] = useState(false);

    return <>
        <Button onClick={() => setOpen(true)} type="primary">Agregar Subarea</Button>
        <Modal
            footer={null}
            title={`Agregar SubArea a (${area.name})`}
            visible={open}
            closable onCancel={() => setOpen(false)}>
            <SubAreaForm
                areaId={areaId}
                onSaved={(area) => {
                    onSaved(area);
                    setOpen(false);
                }} />
        </Modal>
    </>

}

function SubAreaForm({ areaId, onSaved }: { areaId: string, onSaved: (area: InvestmentArea) => void }) {
    const [form] = Form.useForm();
    const axios = useAxios();

    const handleSubmit = (values: any) => {
        axios.post('/investment-sub-area-create-and-add', { ...values, areaId })
            .then((resp) => {
                onSaved(resp.data);
                form.resetFields();
            })
            .catch(() => {
                message.error('Error al crear subarea');
            });
    }

    return <Form form={form} onFinish={handleSubmit}>
        <Form.Item
            name="name"
            label="Nombre">
            <Input />
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit">Crear</Button>
        </Form.Item>
    </Form>
}