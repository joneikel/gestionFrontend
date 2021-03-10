import React from "react";
import { Form, Button, Space, Input } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import MeasurementUnitSelect from "./MeasurementUnitSelect";
import { Project } from "../../../models";

const ImputMeasurementUnit = ({units}:{units?:string[]}) => {

  return (
    <Form.List name="measurement">
      {(fields, { add, remove }) => (
        <>
          {fields.map((field) => (
            <Space
              key={field.key}
              style={{ display: "flex", marginBottom: 8}}
              align="baseline"
            >
              <Form.Item
                hasFeedback
                {...field}
                name={[field.name, "measurement_unit_id"]}
                fieldKey={[field.fieldKey, "measurement_unit_id"]}
                rules={[{ required: true, message: "Selecciona unidad" }]}
              >
                <MeasurementUnitSelect mode={undefined} selectedUnits={units} />
              </Form.Item>
              <Form.Item
                hasFeedback
                {...field}
                name={[field.name, "proposed_goal"]}
                fieldKey={[field.fieldKey, "proposed_goal"]}
                rules={[{ required: true, message: "Introduzca el valor" }]}
              >
                    <Input 
                    placeholder="Meta propuesta"
                    style={{width: '18vw'}}  />
              </Form.Item>
              <Form.Item
                hasFeedback
                {...field}
                name={[field.name, "reached_goal"]}
                fieldKey={[field.fieldKey, "reached_goal"]}
                rules={[{ required: false, message: "Introduzca el valor" }]}
              >
                    <Input 
                    placeholder="Meta alcanzada"
                    style={{width: '18vw'}}  />
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
              Añadir Unidad
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default ImputMeasurementUnit;
