import { Button, Col, message, Popconfirm, Row, Table, Tag } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import { InvestmentArea, InvestmentSubArea } from '../../models';
import { AreaFormModal } from './AreaFormModal';
import { SubAreaFormModal } from './SubAreaFormModal';
import { DeleteOutlined } from '@ant-design/icons';
import { AxiosInstance } from 'axios';
import { useAxios } from '../../hooks/useAxios';
import { useState, useEffect } from 'react';

export function AreaList() {

    const axios = useAxios();
    const [areas, setAreas] = useState<InvestmentArea[]>([]);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        axios
            .get<InvestmentArea[]>("/investment-area", {
                params: {
                    includes: ['investmentSubAreas', 'vertice']
                }
            })
            .then((resp) => setAreas(resp.data))
            .catch((e) => console.log(e))
            .finally(() => setLoading(false));
    }, [reload])

    const cols = [
        {
            dataIndex: 'name',
            title: 'Nombre',
            key: 'name',
        },
        {
            dataIndex: 'investment_sub_areas',
            title: 'Sub-areas',
            key: 'sub-areas',
            render: (investment_sub_areas?: InvestmentSubArea[]) => {
                return <Row gutter={[15, 15]}>
                    {investment_sub_areas?.map(x => (
                        <Col span={8}>
                            <ButtonGroup size="small">
                                <Button type="ghost">{x.name}</Button>
                                <Popconfirm
                                    onConfirm={() => {
                                        deleteSubArea(x.id, axios)
                                            .then(() => {
                                                setReload(reload + 1);
                                            })
                                            .catch((err) => message.error(err.message));
                                    }}
                                    title="Confirme si desea eliminar">
                                    <Button type="primary" icon={<DeleteOutlined />} />
                                </Popconfirm>
                            </ButtonGroup>
                        </Col>
                    ))}</Row>;
            }
        },
        {
            dataIndex: 'vertice',
            title: 'Vertice',
            key: 'vertice',
            render: (vertice?: { name: string, color: string, id: string }) => {
                return vertice ? <Tag color={vertice?.color}>{vertice?.name}</Tag> : "-";
            }
        }, {
            dataIndex: 'id',
            title: 'Acciones',
            key: 'actions',
            render: (id: string, record: InvestmentArea) => {
                return <Row justify="space-between" gutter={[5, 5]}>
                    <Col span={8}>
                        <SubAreaFormModal
                            onSaved={(area) => {
                                setReload(reload + 1);
                            }}
                            areaId={id} area={record} />
                    </Col>
                    <Col span={8}>
                        <AreaFormModal area={record} onSaved={(a) => {
                            setAreas(areas.map(x => x.id === a.id ? a : x));
                        }} />
                    </Col>
                </Row>
            }
        }
    ];

    return <>
        <AreaFormModal onSaved={area => setAreas(areas => areas.map(x => x.id === area.id ? area : x))} />
        <Table columns={cols} dataSource={areas} />
    </>
}

async function deleteSubArea(id: string, axios: AxiosInstance) {
    try {
        const deleted = await axios.delete(`/investment-sub-area/${id}`);
        return deleted.data;
    } catch (error) {
        throw new Error("Error al eliminar la sub-area");
    }
}