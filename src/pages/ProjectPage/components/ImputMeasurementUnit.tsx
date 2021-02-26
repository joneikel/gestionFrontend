import React from "react";
import { Form, Button, Space, Input } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import MeasurementUnitSelect from "./MeasurementUnitSelect";

const ImputMeasurementUnit = () => {

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
                name={[field.name, "measurement_id"]}
                fieldKey={[field.fieldKey, "measurement_id"]}
                rules={[{ required: true, message: "Selecciona unidad" }]}
              >
                <MeasurementUnitSelect mode={undefined}/>
              </Form.Item>
              <Form.Item
                hasFeedback
                {...field}
                name={[field.name, "measurement_value"]}
                fieldKey={[field.fieldKey, "measurement_value"]}
                rules={[{ required: true, message: "Introduzca el valor" }]}
              >
                    <Input style={{width: '18vw'}}  />
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
