import React from "react";
import { Form, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import BudgetSourceSelector from "./BudgetSourceSelector";
import NumberFormat from "react-number-format";
import { Budget } from "../../../models";

const InputBudget = ({initial_budgets}:{initial_budgets?:Budget[]}) => {



  return (
    <Form.List  
    name="budgets"
    initialValue={
      initial_budgets?.map((x:Budget) => {
        x.value = Number(x.value);
        x.dollar_value = Number(x.dollar_value);
        return x;
      })
    }
    >
      {(fields, { add, remove }) => (
        <>
          {fields.map((field,i) => (
            <Space
              key={field.key}
              style={{ display: "flex", marginBottom: 8 }}
              align="baseline"
            >
              <Form.Item
                hasFeedback
                {...field}
                name={[field.name, "value"]}
                fieldKey={[field.fieldKey, "value"]}
                rules={[{ required: true, message: "Introduzca el valor del presupuesto" }]}
              >
                 <NumberFormat
                  className="ant-input"
                  thousandSeparator={"."} 
                  decimalScale={2} 
                  decimalSeparator={","} 
                  maxLength={21} 
                  style={{ width: '23vw'}}
                  placeholder="Cantidad en Bolivares."
                  prefix="Bs."
              />
              </Form.Item>
              <Form.Item
                hasFeedback
                {...field}
                name={[field.name, "dollar_value"]}
                fieldKey={[field.fieldKey, "dollar_value"]}
                rules={[{ required: true, message: "Introduzca el valor en $ del presupuesto" }]}
              >
                    <NumberFormat
                  className="ant-input"
                  thousandSeparator={"."} 
                  decimalScale={2} 
                  decimalSeparator={","} 
                  maxLength={21} 
                  style={{ width: '23vw'}}
                  placeholder="Cantidad en Divisas."
                  prefix="$."
              />
              </Form.Item>

              <Form.Item
                hasFeedback
                {...field}
                name={[field.name, "budget_source_id"]}
                fieldKey={[field.fieldKey, "budget_source_id"]}
                rules={[{ required: true, message: "Seleccione el tipo de presupuesto" }]}
              >
                <BudgetSourceSelector initial_value={initial_budgets ? initial_budgets[i]?.budget_source_id : undefined}  />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(field.name)} />
            
            </Space>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => {
                add();
                console.log(fields);
              }}
              block
              icon={<PlusOutlined />}
            >
              Añadir presupuesto
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default InputBudget;
