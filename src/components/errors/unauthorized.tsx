import { Result } from 'antd';
import React from 'react';

const Unauthorized = () => {
    return (
        <Result
            status="403"
            title="403"
            subTitle="No estas autorizado para ver esta pagina. 🤷‍♂️"
        />
    )
}

export default Unauthorized;