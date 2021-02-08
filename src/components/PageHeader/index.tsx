import { PageHeader } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';

const CustomPageHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => {

    const history = useHistory()

    return (
        <PageHeader
            onBack={() => history.goBack()}
            title={<h2 className="ant-card-head-title">{title}</h2>}
            subTitle={subtitle || ""}
        />
    )
}

export default CustomPageHeader;