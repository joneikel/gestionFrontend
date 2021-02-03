import { Button, Col, Form, Input, message, Row, Select } from "antd";
import React, { useState } from "react";
import ProgramSelect from "../../ActivityPage/components/ProgramSelect";
import { useAxios } from "../../../hooks/useAxios";
import { useHistory } from "react-router-dom";
import InstitutionsSelect from "../../ActivityPage/components/InstitutionSelect";
import ProjectStatusSelect from "../components/ProjectStatusSelect";
import InputBudget from "../components/InputBudget";
import InvestmentAreaSelect from "../components/InvesmentAreaSelect";
import MeasurementUnitSelect from "../components/MeasurementUnitSelect";

const ProjectForm = () => {

    const axios = useAxios();
    const history = useHistory();

    const [loading, setLoading] = useState<boolean>(false);
    const [parentInstitution, setParentInstitution] = useState<
        string | undefined
    >();
    const [institution, setInstitution] = useState<
        string | undefined
    >();


    const handleSubmit = async (values: any) => {

        setLoading(true);
        try {
            const response = await axios.post('project', values);
            message.success("Proyecto creado.");
            history.push('/nuevo-proyecto');
            return response;
        } catch (error) {
            message.error("No se pudo crear el proyecto.");
        } finally {
            setLoading(false);
        }
    };

    const [Program, setProgram] = useState<string | undefined>();

    return (
        <>
            <h1>Nuevo Proyecto</h1><br />
            <Form layout="vertical" onFinish={handleSubmit}>
                <Row gutter={10}>

                    <Col span={12}>
                        <Form.Item
                            hasFeedback
                            name="parentInstitution"
                            label="Secretaria Ejecutiva"
                            rules={[
                                {
                                    required: true,
                                    message: "Debes seleccionar secretaria ejecutiva.",
                                },
                            ]}
                        >
                            <InstitutionsSelect onlyParent onChange={setParentInstitution} />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            hasFeedback
                            name="institutionId"
                            label="Institucion"
                            rules={[
                                {
                                    required: true,
                                    message: "Debes seleccionar secretaria ejecutiva.",
                                },
                            ]}
                        >
                            <InstitutionsSelect
                                disabled={!parentInstitution}
                                parentId={parentInstitution}
                                onChange={setInstitution}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            hasFeedback
                            name="program"
                            label="Programa al que pertence"
                            rules={[
                                { required: true, message: "Debes indicar nombre del programa." },
                            ]}
                        >
                            <ProgramSelect
                                disabled={!institution}
                                institutionId={institution}
                                onChange={setProgram}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            hasFeedback
                            name="name"
                            label="Nombre del proyecto"
                            rules={[
                                {
                                    required: true,
                                    message: "Debe indicar nombre del proyecto",
                                },
                            ]}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            hasFeedback
                            name="description"
                            label="Descripción del proyecto"
                            rules={[
                                {
                                    required: true,
                                    message: "Escribe una breve descripción del proyecto.",
                                },
                            ]}>
                            <Input.TextArea rows={3} />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            hasFeedback
                            name="status"
                            label="Status de ejecución"
                            rules={[
                                {
                                    required: true,
                                    message: "Debe seleccionar el status de ejecución",
                                },
                            ]}>
                            <ProjectStatusSelect />
                        </Form.Item>


                    </Col>

                    <Col span={12}>
                        <Form.Item
                            hasFeedback
                            name="isPlanified"
                            label="¿Planificado?"
                            rules={[
                                {
                                    required: true,
                                    message: "Debe seleccionar el status de ejecución",
                                },
                            ]}>
                            <Select>
                                <Select.Option value={1} > Si </Select.Option>
                                <Select.Option value={0} > No </Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            hasFeedback
                            name="budgets"
                            label="Presupuesto"
                            rules={[
                                {
                                    required: true,
                                    message: "Debes indicar indicar el presupuesto asignado a este Proyecto",
                                },
                            ]}
                        >
                            <InputBudget />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            hasFeedback
                            name="investmentAreas"
                            label="Area de Inversión"
                            key="investmentArea"
                            rules={[
                                {
                                    required: true,
                                    message: "Selecciona el area de inversión",
                                },
                            ]}
                        >
                            <InvestmentAreaSelect mode="multiple" />
                        </Form.Item>
                    </Col>

                    <Col span={3}>
                        <Form.Item
                            hasFeedback
                            name="measurement"
                            label="Unidad de medida"
                            rules={[
                                {
                                    required: true,
                                    message: "Indica la unidad de medida",
                                },
                            ]}
                        >
                            <MeasurementUnitSelect mode={undefined} />
                        </Form.Item>
                    </Col>

                    <Col span={3}>
                        <Form.Item
                            hasFeedback
                            name="measurementValue"
                            label="Valor de medida"
                            rules={[
                                {
                                    required: true,
                                    message: "Indica el valor de medida",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            hasFeedback
                            name="initDate"
                            label="Fecha de inicio"
                            rules={[
                                {
                                    required: true,
                                    message: "Debes indicar fecha de inicio de la actividad",
                                },
                            ]}
                        >
                            <Input type="date" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            hasFeedback
                            name="endDate"
                            label="Fecha de Culminacion"
                            rules={[
                                {
                                    required: true,
                                    message: "Debes indicar fecha de culminacion de la actividad",
                                },
                            ]}>
                            <Input type="date" />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading} >
                                Guardar
                        </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default ProjectForm;
