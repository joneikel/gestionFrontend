import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { useAxios } from '../../../hooks/useAxios';
import { AxiosInstance } from "axios";
import { BudgetSource } from "../../../models";

const BudgetSourceSelector = ({
    disabled,
    onChange
}: {
    onChange?:Function,
    disabled?:boolean
}) => {

    const axios = useAxios();
    const [ budgetSource, setBudgetSource ] = useState<BudgetSource[] | undefined>();
    const [ loading, setLoading ] = useState(false); 

  const handleChange = (v: string) => {
    onChange && onChange(v);
  };

  useEffect(()=>{
    setLoading(true);
    getBudgetSource(axios)
      .then((x:BudgetSource[]) => setBudgetSource(x))
      .catch( (e) => console.log(e))
      .finally( ()=> setLoading(false));
    setLoading(false);
  }, [])

  return (
    <Select disabled={disabled} onChange={handleChange} loading={loading} style={{width: '15vw'}}>
      {budgetSource && budgetSource.map((budget) => (
        <Select.Option value={budget.id} key={budget.id}>
          {budget.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default BudgetSourceSelector;

async function getBudgetSource(axios:AxiosInstance):Promise<BudgetSource[]>{
    const response = await axios.get('/budget-source');
    return response.data;


}