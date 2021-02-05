import { Table } from 'antd';
import React from 'react';
import { Column } from '../../models';

const MainTable = ({
    columns,
    dataSource,
    onSearch,
    loading,
}:{
    columns: Array<any>,
    dataSource:any,
    onSearch: Function,
    loading: boolean
}) => {
            
    
    return (
        <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        />
    )
}



export default MainTable;