import React, { useState } from 'react';
import { Select } from 'antd';
import { useMeasurementUnit } from '../../../hooks/useMeasurementUnit';

const MeasurementUnitSelect = ({initial_value, mode, value, onChange, selectedUnits }: { initial_value?:string, mode: "multiple" | "tags" | undefined, value?: string, onChange?: Function, selectedUnits?:string[] }) => {

    const [measurementUnit, loading] = useMeasurementUnit();
    const [unit, setUnit] = useState<Array<string> | string | undefined>(value)

    const handleChange = (value: any) => {
        setUnit(value);
        onChange && onChange(value);
    }

    return (
        <Select
            defaultValue={initial_value}
            placeholder="Unidad de medida"
            value={unit}
            mode={mode}
            loading={loading}
            onChange={(value: string[]|string) => handleChange(value)}
            style={{width: '20vw'}}
        >   
            { 
                //Opciones a mostrar en el panel de detalles de proyecto
            selectedUnits ? 
                measurementUnit.filter((unit) => !selectedUnits.includes(unit.id)).map(unit => (
                    <Select.Option
                        value={unit.id}
                        key={unit.id}>
                        {unit.name}
                    </Select.Option>
                ))
            :   //Opciones mostrar en el formulario de de proyecto
                measurementUnit.map(unit => (
                <Select.Option
                    value={unit.id}
                    key={unit.id}>
                    {unit.name}
                </Select.Option>
            ))
            }
        </Select>
    )
}

export default MeasurementUnitSelect;