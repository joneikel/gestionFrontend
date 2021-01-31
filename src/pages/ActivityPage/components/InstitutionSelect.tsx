import { Select } from "antd";
import React from "react";
import { useInstitutions } from "../../../hooks/useInstitutions";

const InstitutionsSelect = ({
  parentId,
  value,
  onChange,
  disabled,
  onlyParent
}: {
  parentId?: string;
  value?: string;
  onChange?: Function;
  disabled?: boolean;
  onlyParent?: boolean;
}) => {

  const [institutions, loadingInstitution] = useInstitutions(parentId, onlyParent);

  const handleChange = (v: string) => {
    onChange && onChange(v);
  };

  return (
    <Select disabled={disabled} onChange={handleChange} loading={loadingInstitution}>
      {institutions.map((institution) => (
        <Select.Option value={institution.id} key={institution.id}>
          {institution.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default InstitutionsSelect;
