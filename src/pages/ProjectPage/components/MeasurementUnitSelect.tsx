import React, { useState } from 'react';
import { Select } from 'antd';
import { useMeasurementUnit } from '../../../hooks/useMeasurementUnit';

const MeasurementUnitSelect = ({mode, value, onChange}: {mode: "multiple"|"tags"|undefined , value?:string, onChange?: Function }) => {

    const [measurementUnit, loading] = useMeasurementUnit();
    const [ unit, setUnit ] = useState<Array<string>|string|undefined>(value)

    const handleChange = (value:any) => {
        setUnit(value);
        onChange && onChange(value);
    }

    return (
        <Select
        value={unit}
        mode={mode}
        loading={loading}
        onChange={ (value) => handleChange(value)}
        >
            {measurementUnit.map(unit => (
                <Select.Option
                    value={unit.id}
                    key={unit.id}>
                    {unit.shortName}
                </Select.Option>
            ))}
        </Select>
    )
}

export default MeasurementUnitSelect;