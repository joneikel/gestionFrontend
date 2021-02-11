import { Table } from 'antd';
import React from 'react';

const MainTable = ({
    columns,
    dataSource,
    onSearch,
    loading,
}: {
    columns: Array<any>,
    dataSource: any,
    onSearch: Function,
    loading: boolean
}) => {


    return (
        <Table
            footer={() => <p>Total {dataSource?.length}</p>}
            className="table"
            loading={loading}
            columns={columns}
            dataSource={dataSource}
        />
    )
}



export default MainTable;