import { PageHeader } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';

const CustomPageHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => {

    const history = useHistory()

    return (
        <PageHeader
            onBack={() => history.goBack()}
            title={title}
            subTitle={subtitle || ""}
        />
    )
}

export default CustomPageHeader;