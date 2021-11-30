import { Button, Form, Input, message, Modal } from 'antd';
import { AxiosInstance } from 'axios';
import { useState } from 'react';
import { useAxios } from '../../hooks/useAxios';
import { InvestmentArea } from '../../models';
import InvestmentSubAreaSelect from '../ProjectPage/components/InvestmentSubAreaSelect';
import { VerticeSelect } from '../ProjectPage/components/VerticeSelect';

export function AreaFormModal({ area }: { area?: InvestmentArea }) {

    const [open, setOpen] = useState(false);

    return <>
        <Button onClick={() => setOpen(true)} type="primary">{area ? "Editar" : "Agregar"} Area</Button>
        <Modal
            destroyOnClose
            title={`${area ? "Editar" : "Agregar"} Area`}
            visible={open}
            closable onCancel={() => setOpen(false)}>
            <AreaForm area={area} />
        </Modal>
    </>
}

function AreaForm({ area }: { area?: InvestmentArea }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const axios = useAxios()
    const handleSubmit = (values: any) => {
        if (area) {
            updateArea(values, area.id, axios)
                .then((data) => console.log(data))
                .catch(e => message.error(e.message))
                .finally(() => setLoading(false));
        } else {
            createArea(values, axios)
                .then((data) => console.log(data))
                .catch(e => e.message)
                .finally(() => setLoading(false));
        }
    }

    return <Form initialValues={area} onFinish={handleSubmit}>
        <Form.Item
            name="vertice_id"
            label="Vertice">
            <VerticeSelect />
        </Form.Item>
        <Form.Item
            name="name"
            label="Nombre">
            <Input />
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit">Guardar</Button>
        </Form.Item>
    </Form>
}

async function updateArea(area: InvestmentArea, id: string, _axios: AxiosInstance) {
    try {
        const resp = await _axios.patch(`/investment-area/${id}`, area);
        return resp.data;
    } catch (error) {
        throw new Error("Error al actualizar el area");
    }
}

async function createArea(area: InvestmentArea, _axios: AxiosInstance) {
    try {
        const resp = await _axios.post(`/investment_area`, area);
        return resp.data;
    } catch (error) {
        throw new Error("Error al crear el area");
    }
}