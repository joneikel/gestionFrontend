import { Card } from 'antd';
import React from 'react';
import ActivityForm from './forms/ActivityForm';

const ActivityPage = () => {
    return (
        <Card title="Nueva actividad">
            <ActivityForm />
        </Card>
    )
}

export default ActivityPage;