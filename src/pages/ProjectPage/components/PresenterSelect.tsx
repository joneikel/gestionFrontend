import { Select } from "antd";
import { usePresenters } from "../../../hooks/usePresenter";

export function PresenterSelect({ value, onChange, mode }: {
    value?: string;
    onChange?: Function;
    mode?: "multiple" | "tags" | undefined;
}) {

    const [presenters, loading] = usePresenters();

    const handleChange = (value: string) => {
        onChange && onChange(value);
    }

    return <Select
        onChange={handleChange}
        mode={mode}
        loading={loading}>
        {presenters.map(presenter => {
            return <Select.Option
                value={presenter.id}
                key={presenter.id}>
                {presenter.name}
            </Select.Option>
        })};
    </Select>
}