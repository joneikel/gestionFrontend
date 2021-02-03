import { AxiosInstance } from 'axios';
import React, { useState } from 'react';
import { Select } from 'antd';
import { useInvestmentArea } from '../../../hooks/useInvestmentArea';
import { InvestmentArea } from '../../../models';

const InvestmentAreaSelect = ({mode, value, onChange}: {mode: "multiple"|"tags"|undefined , value?:string, onChange?: Function }) => {

    const [investmentAreas, loading] = useInvestmentArea();
    const [ area, setArea ] = useState<Array<string>|string|undefined>(value)

    const handleChange = (value:any) => {
        setArea(value);
        onChange && onChange(value);
    }

    return (
        <Select
        
        value={area}
        mode={mode}
        loading={loading}
        onChange={ (value) => handleChange(value)}
        >
            {investmentAreas.map(investmentArea => (
                <Select.Option
                    value={investmentArea.id}
                    key={investmentArea.id}>
                    {investmentArea.name}
                </Select.Option>
            ))}
        </Select>
    )
}

export default InvestmentAreaSelect;