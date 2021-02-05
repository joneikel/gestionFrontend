import { Col, Input, Row } from 'antd';
import React from 'react';

const TableHeader = ({onSearch}:{onSearch:Function | undefined}) => {

    return (
        <Row>
            <Col span={12}>
                <Input.Search enterButton type="search" placeholder="Buscar..." onSearch={ (v) => onSearch && onSearch(v)}  />
            </Col>
        </Row>
    )

}

export default TableHeader;