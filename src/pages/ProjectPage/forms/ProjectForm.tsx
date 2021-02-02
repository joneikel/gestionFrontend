import { Button, Col, Form, Input, message, Row } from "antd";
import React, { useState } from "react";
import ProgramSelect from "../../ActivityPage/components/ProgramSelect";
import { useAxios } from "../../../hooks/useAxios";
import { useHistory } from "react-router-dom";
import InstitutionsSelect from "../../ActivityPage/components/InstitutionSelect";

const ProjectForm = () => {

    const axios = useAxios();
    const history = useHistory();

    const [loading,setLoading] = useState<boolean>(false);
    const [parentInstitution, setParentInstitution] = useState<
    string | undefined
    >();
    const [institution,setInstitution] = useState<
    string | undefined
    >();
    

    const handleSubmit = async (values: any) => {

        delete values.parentInstitution;
        delete values.institutionId;

        console.log(values);

        setLoading(true);
        try {
            const response =  await axios.post('project',values);
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
        <h1>Nuevo Proyecto</h1><br/>
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
