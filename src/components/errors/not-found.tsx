import { Result } from 'antd';
import React from 'react';

const PageNotFound = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="La pagina que buscas no existe. 🤷‍♂️"
        />
    )
}

export default PageNotFound;