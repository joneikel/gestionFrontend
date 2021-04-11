import { Select } from "antd";
import React from "react";
import { useInstitutions } from "../../../hooks/useInstitutions";
import UserContainer from "../../../unstated/UserContainer";

const InstitutionsSelect = ({
  parentId,
  value,
  onChange,
  disabled,
  onlyParent,
  initial_value
}: {
  parentId?: string;
  value?: string;
  onChange?: Function;
  disabled?: boolean;
  onlyParent?: boolean;
  initial_value?: string
}) => {

  const userState = UserContainer.useContainer();

  const [institutions, loadingInstitution] = useInstitutions(parentId, onlyParent);

  const handleChange = (v: string) => {
    onChange && onChange(v);
  };

  return (
      <Select
      defaultValue={ initial_value }
      showSearch
      filterOption={true}
      optionFilterProp='label'
      style={{ width: '100%' }}
      placeholder={onlyParent ? "Secreataría ejecutiva" : "Secreataría"} disabled={disabled} onChange={handleChange} loading={loadingInstitution}>
      {institutions.map((institution) => (
        <Select.Option value={institution.id} key={institution.id} label={institution.name} >
          {institution.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default InstitutionsSelect;
