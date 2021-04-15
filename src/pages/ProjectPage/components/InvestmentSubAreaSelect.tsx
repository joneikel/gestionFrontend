import { Select } from "antd";
import React, { useState } from "react";
import { useInvestmentSubArea } from "../../../hooks/useInvestmentSubAreas";

const InvestmentSubAreaSelect = ({ mode, value, onChange, investmentAreaIds, disabled, initial_value}:{ initial_value?:string[] , mode: "multiple" | "tags" | undefined, value?: string[], onChange?: Function, investmentAreaIds?:string[], disabled?:boolean }) => {

    const [investmentSubArea, loading] = useInvestmentSubArea(investmentAreaIds);

    const [subArea, setSubArea] = useState<string[] | undefined>(value)

    const handleChange = (value: string[]) => {
        setSubArea(value);
        onChange && onChange(value);
    }
    return(
        <Select
            defaultValue={initial_value}
            disabled={disabled}
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