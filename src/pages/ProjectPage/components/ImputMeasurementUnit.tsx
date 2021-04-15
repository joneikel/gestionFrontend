import React, { useState } from "react";
import { Form, Button, Space, Input } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import MeasurementUnitSelect from "./MeasurementUnitSelect";
import { MeasurementUnit, Project } from "../../../models";
import { idText } from "typescript";

const ImputMeasurementUnit = ({ initial_value, units }: { initial_value?: MeasurementUnit[], units?: string[] }) => {

  const [proposedGoals, setProposedGoals] = useState<Number[]>(
    initial_value ? initial_value.map((x) => x.pivot.proposed_goal) : []);

  return (
    <Form.List name="measurement" initialValue={
      initial_value?.map((x) => ({
        measurement_unit_id: x.id,
        proposed_goal: Number(x.pivot.proposed_goal),
        reached_goal:  x.pivot.reached_goal ? Number(x.pivot.reached_goal) : undefined
      }))
    }>
      {(fields, { add, remove }) => (
        <>
          {fields.map((field, i) => (
            <Space
              key={field.key}
              style={{ display: "flex", marginBottom: 8 }}
              align="baseline"
            >
              <Form.Item
                hasFeedback
                {...field}
                name={[field.name, "measurement_unit_id"]}
                fieldKey={[field.fieldKey, "measurement_unit_id"]}
                rules={[{ required: true, message: "Selecciona unidad" }]}
              >
                <MeasurementUnitSelect initial_value={initial_value ? initial_value[i]?.id : undefined} mode={undefined} selectedUnits={units} />
              </Form.Item>
              <Form.Item
                hasFeedback
                {...field}
                name={[field.name, "proposed_goal"]}
                fieldKey={[field.fieldKey, "proposed_goal"]}
                rules={[{ required: true, message: "Introduzca el valor" }]}
              >
                <Input
                  onChange={(e) => {
                    let modifiedGoals = proposedGoals;
                    modifiedGoals[i] = Number(e.target.value);
                    setProposedGoals(modifiedGoals);
                  }}
                  placeholder="Meta propuesta"
                  style={{ width: '18vw' }} />
              </Form.Item>
              <Form.Item
                hasFeedback
                {...field}
                name={[field.name, "reached_goal"]}
                fieldKey={[field.fieldKey, "reached_goal"]}
                rules={[{
                  required: false,
                  message: "Introduzca el valor"
                }, {
                  validator: async (_, value) => {
                    value = value ? value : 0;
                    console.log(value);
                    let reached_goal = Number(value);
                    let proposed_goal = Number(proposedGoals[i])

                    if (proposed_goal >= reached_goal) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject('Meta alcanzada excede meta propuesta');
                    }
                  }
                }]}
              >
                <Input
                  placeholder="Meta alcanzada"
                  style={{ width: '18vw' }} />
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
