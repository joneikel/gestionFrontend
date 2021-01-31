import { Button, DatePicker, Form, Input, InputNumber, Switch } from "antd";
import React, { useState } from "react";
import ActivityImpactSelect from "../../LoginPage/components/ActivityImpactSelect";
import InstitutionsSelect from "../components/InstitutionSelect";
import ProgramSelect from "../components/ProgramSelect";
import ProjectSelect from "../components/ProjectSelect";

const ActivityForm = () => {
  const handleSubmit = (values: any) => {
    console.log(values);
  };

  const [program, setProgram] = useState<string|undefined>();
  const [parentInstitution, setParentInstitution] = useState<string|undefined>();

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        hasFeedback
        name="parent_institution"
        label="Secretaria Ejecutiva"
        rules={[
          { required: true, message: "Debes seleccionar secretaria ejecutiva." },
        ]}
      >
        <InstitutionsSelect onlyParent onChange={setParentInstitution}  />
      </Form.Item>
      <Form.Item
        hasFeedback
        name="institutionId"
        label="Institucion"
        rules={[
          { required: true, message: "Debes seleccionar secretaria ejecutiva." },
        ]}
      >
        <InstitutionsSelect disabled={!parentInstitution} parentId={parentInstitution} onChange={setParentInstitution}  />
      </Form.Item>
      <Form.Item
        hasFeedback
        name="program"
        label="Programa"
        rules={[
          { required: true, message: "Debes indicar nombre del programa." },
        ]}
      >
        <ProgramSelect onChange={setProgram} institutionId={"a51f463a-2293-465a-bbc5-a157436abc28"} />
      </Form.Item>
      <Form.Item
        hasFeedback
        name="project"
        label="Proyecto"
        rules={[
          { required: true, message: "Debes seleccionar el proyecto." },
        ]}
      >
        <ProjectSelect disabled={!program} programId={program} />
      </Form.Item>
      <Form.Item
        hasFeedback
        name="name"
        label="Actividad"
        rules={[
          { required: true, message: "Debes indicar nombre de la actividad" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        hasFeedback
        name="description"
        label="Descripcion"
        rules={[
          {
            required: true,
            message: "Debes indicar descripcion de la actividad",
          },
        ]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item
        hasFeedback
        name="gobernador"
        label="Asistio el Gobernador"
        rules={[{ required: true, message: "Debes indicar" }]}
      >
        <Switch defaultChecked />
      </Form.Item>

      <Form.Item
        hasFeedback
        name="conclusion"
        label="Conclusiones"
        rules={[
          {
            required: true,
            message: "Debes indicar conlusiones de la actividad",
          },
        ]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>
      <Form.Item
        hasFeedback
        name="address"
        label="Direccion"
        rules={[
          {
            required: true,
            message: "Debes indicar direccion de la actividad",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        hasFeedback
        name="init_date"
        label="Fecha de inicio"
        rules={[
          {
            required: true,
            message: "Debes indicar fecha de inicio de la actividad",
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        hasFeedback
        name="end_date"
        label="Fecha de Culminacion"
        rules={[
          {
            required: true,
            message: "Debes indicar fecha de culminacion de la actividad",
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        hasFeedback
        name="estimated_population"
        label="Poblacion Estimada"
        rules={[
          {
            required: true,
            message: "Debes indicar poblacion estimada de la actividad",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        hasFeedback
        name="benefited_population"
        label="Poblacion Beneficiada"
        rules={[
          {
            required: true,
            message: "Debes indicar poblacion benefiada de la actividad",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        hasFeedback
        name="gestion_impact"
        label="Impacto de gestion"
        rules={[
          { required: true, message: "Debes indicar el impacto de la gestion" },
        ]}
      >
        <ActivityImpactSelect />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Registrar
        </Button>
      </Form.Item>
    </Form>
  );
};
export default ActivityForm;
