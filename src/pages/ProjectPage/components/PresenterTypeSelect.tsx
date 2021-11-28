import { Select } from "antd";
import { usePresenterType } from "../../../hooks/usePresenterType";

export function PresenterTypeSelect({ value, onChange }: {
    value?: string;
    onChange?: Function;
}) {

    const [vertices, loading] = usePresenterType();

    const handleChange = (value: string) => {
        console.log(value);
        onChange && onChange(value);
    }

    return <Select
        onChange={(value) => {
            console.log(value);
            handleChange(value as string);
        }}
        loading={loading}>
        {vertices.map(vertice => {
            return <Select.Option
                value={vertice.id}
                key={vertice.id}>
                {vertice.name}
            </Select.Option>
        })};
    </Select>
}