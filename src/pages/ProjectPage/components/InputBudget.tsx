import React, { useState } from "react";
import { Form, Button, Space, Input } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Budget } from "../../../models";
import BudgetSourceSelector from "./BudgetSourceSelector";

const InputBudget = () => {

  return (
    <Form.List name="budgets">
      {(fields, { add, remove }) => (
        <>
          {fields.map((field) => (
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
                    <Input max={undefined} prefix='Bs.' style={{width: '23vw'}}  />
              </Form.Item>
              <Form.Item
                hasFeedback
                {...field}
                name={[field.name, "dollar_value"]}
                fieldKey={[field.fieldKey, "value"]}
                rules={[{ required: true, message: "Introduzca el presupuesto en dolares" }]}
              >
                    <Input max={undefined} prefix='$.' style={{width: '23vw'}}  />
              </Form.Item>
              <Form.Item
                hasFeedback
                {...field}
                name={[field.name, "dollar_value"]}
                fieldKey={[field.fieldKey, "dollar_value"]}
                rules={[{ required: true, message: "Introduzca el valor en $ del presupuesto" }]}
              >
                    <Input max={undefined} prefix='$' style={{width: '23vw'}}  />
              </Form.Item>

              <Form.Item
                hasFeedback
                {...field}
                name={[field.name, "budget_source_id"]}
                fieldKey={[field.fieldKey, "budget_source_id"]}
                rules={[{ required: true, message: "Seleccione el tipo de presupuesto" }]}
              >
                <BudgetSourceSelector/>
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
