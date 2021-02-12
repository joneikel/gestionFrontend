import { Select } from "antd";
import React, { useState } from "react";
import { useInvestmentSubArea } from "../../../hooks/useInvestmentSubAreas";
import { InvestmentSubArea } from "../../../models";

const InvestmentSubAreaSelect = ({ mode, value, onChange }:{ mode: "multiple" | "tags" | undefined, value?: string[], onChange?: Function }) => {
    const [investmentSubArea, loading] = useInvestmentSubArea();
    const [subArea, setSubArea] = useState<string[] | undefined>(value)

    const handleChange = (value: string[]) => {
        setSubArea(value);
        onChange && onChange(value);
    }
    return(
        <Select
            filterOption={true}
            optionFilterProp= 'label'
            placeholder= 'Sub-Area de inversión'
            style={{width: '100%'}}
            value= {subArea}
            mode= {mode}
            loading={loading}
            onChange={(value:string[]) => handleChange(value)}
        >
            {investmentSubArea.map(investmentSubArea => (
                <Select.Option
                    label={investmentSubArea.name}
                    value={investmentSubArea.id}
                    key={investmentSubArea.id}>
                    {investmentSubArea.name}
                </Select.Option>
            ))}
        </Select>
    )
}
export default InvestmentSubAreaSelect;