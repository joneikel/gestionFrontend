import { Table } from 'antd';
import { Presenter } from '../../hooks/usePresenter';
import { useProposals } from "../../hooks/useProposals";
import { Vertice } from '../../hooks/useVertices';
import { Parroquia } from '../../models';

export default function ProposalPage() {

    const [proposals] = useProposals();

    const cols = [
        {
            title: "Necesidad",
            key: "title",
            dataIndex: 'title'
        },
        {
            title: "Presentante",
            key: "presenter",
            dataIndex: 'presenter',
            render: (prensenter: Presenter) => {
                return prensenter.name;
            }
        },
        {
            title: "Parroquia",
            key: "Parroquia",
            dataIndex: 'parroquia',
            render: (parroquia: Parroquia) => {
                return parroquia.name;
            }
        },
        {
            title: "Municipio",
            key: "Municipio",
            dataIndex: 'parroquia',
            render: (parroquia: Parroquia) => {
                return parroquia.municipio.name;
            }
        },
        {
            title: "Vertice",
            key: "Vertice",
            dataIndex: 'vertice',
            render: (vertice: Vertice) => {
                return vertice.name;
            }
        }
    ];

    return (
        <Table columns={cols} dataSource={proposals}></Table>
    )

}