import React, { useState } from "react";
import { Form, Button, Space, Select, Input } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Budget } from "../../../models";

const InputBudget = ({

    }:{

}) => {
  const [budget, setBudget] = useState<Budget | undefined> ();

  return (
    <Form.List name="budget">
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
                    <Input max={undefined} prefix='Bs.' style={{width: '25vw'}}  />
              </Form.Item>

              <Form.Item
                hasFeedback
                {...field}
                name={[field.name, "budgeSourceId"]}
                fieldKey={[field.fieldKey, "budgeSourceId"]}
                rules={[{ required: true, message: "Seleccione el tipo de presupuesto" }]}
              >
                <Select style={{width: '10vw'}}>
                    <Select.Option value={1} > Tipo 1</Select.Option>
                    <Select.Option value={2} > Tipo 2</Select.Option>
                </Select>
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
