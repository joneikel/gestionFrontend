import { useState } from 'react';
import { Select } from 'antd';
import { useInvestmentArea } from '../../../hooks/useInvestmentArea';

const InvestmentAreaSelect = ({ mode, value, onChange, initial_value, vertice }:
    {
        vertice?: string;
        initial_value?: string[],
        mode: "multiple" | "tags" | undefined,
        value?: string[],
        onChange?: Function
    }) => {

    const [investmentAreas, loading] = useInvestmentArea(vertice);
    const [area, setArea] = useState<Array<string> | string | undefined>(value)

    const handleChange = (value: any) => {
        setArea(value);
        onChange && onChange(value);
    }

    return (
        <Select
            defaultValue={initial_value}
            filterOption={true}
            optionFilterProp='label'
            placeholder="Areas de inversión"
            style={{ width: '100%' }}
            value={area}
            mode={mode}
            loading={loading}
            onChange={(value) => { console.log(value); handleChange(value); }}
        >
            {investmentAreas.map(investmentArea => (
                <Select.Option
                    label={investmentArea.name}
                    value={investmentArea.id}
                    key={investmentArea.id}>
                    {investmentArea.name}
                </Select.Option>
            ))}
        </Select>
    )
}

export default InvestmentAreaSelect;