import { Select } from "antd";
import { useVertices } from "../../../hooks/useVertices";

export function VerticeSelect({ value, onChange, mode }: {
    value?: string;
    onChange?: Function;
    mode?: "multiple" | "tags" | undefined;
}) {

    const [vertices, loading] = useVertices();

    const handleChange = (value: string) => {
        onChange && onChange(value);
    }

    return <Select
        onChange={handleChange}
        mode={mode}
        loading={loading}>
        {vertices.map(vertice => {
            return <Select.Option
                value={vertice.id}
                key={vertice.code_name}>
                {vertice.name}
            </Select.Option>
        })};
    </Select>
}