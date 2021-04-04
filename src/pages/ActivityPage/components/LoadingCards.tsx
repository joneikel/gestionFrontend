import { Card, Space } from 'antd';
import React from 'react';

const LoadingCards = () => {
    return (
        <Space>
            {[0, 1, 2].map(x => 
                <Card
                    loading={true}
                    style={{ margin: '15px', width: '300  px' }}
                    className="base-card activity-card floating-element"
                >

                </Card>)}
        </Space>
    )
}

export default LoadingCards;