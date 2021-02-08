import { Button, Card, Col, Row, Select, Space, Tag, Form, Empty  } from 'antd';
import { AxiosInstance } from 'axios';
import React, { useEffect, useState } from 'react';
import MainTable from '../../components/tables/MainTable';
import { useAxios } from '../../hooks/useAxios';
import { Activity, Institution, Municipio, Parroquia, Project } from '../../models';
import ActivityCard from './components/ActivityCard';
import MunicipiosSelect from './components/MunicipioSelect';
import ParroquiaSelect from './components/ParroquiaSelect';
import { useHistory } from 'react-router-dom';
import { AnyARecord } from 'dns';
import { useForm } from 'antd/lib/form/Form';
import InstitutionsSelect from './components/InstitutionSelect';

const ActivityPage = ({ projectId }: { projectId?: string }) => {

  const axios = useAxios();
  const history = useHistory();
  const [form] = useForm();

  const [municipio, setMunicipio] = useState<string | undefined>();


  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState<Activity[] | undefined>();
  const [parentInstitution, setParentInstitution] = useState<string| undefined>();
  const [filteredActivities, setFilteredActivities] = useState<Activity[] | undefined>();

  useEffect(() => {
    setLoading(true);
    getActivities(axios)
      .then((c: Activity[]) => { setActivities(c); setFilteredActivities(c); })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, [])

  const columns = [
    {
      title: 'Actividad',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '¿Presencia del Gobernador?',
      dataIndex: 'gobernador',
      key: 'gobernador',
      render: (gobernador: boolean) => !gobernador ?
        (<Tag color='red' >No</Tag>) :
        (<Tag color='green' >Si</Tag>)
    }, {
      title: 'Proyecto',
      dataIndex: 'project',
      key: 'project',
      render: (project: Project) => <span color='green' >{project.name}</span>
    }, {
      title: 'Poblacion beneficiada',
      dataIndex: 'benefitedPopulation',
      key: 'benefitedPopulation',
      render: (benefitedPopulation: number) => <span>{benefitedPopulation}</span>
    }, {
      title: 'Municipio',
      dataIndex: 'municipio',
      key: 'municipio',
      render: (municipio: Municipio) => <span>{municipio.name}</span>
    }, {
      title: 'Parroquia',
      dataIndex: 'parroquia',
      key: 'parroquia',
      render: (parroquia: Parroquia) => <span>{parroquia.name}</span>
    }
  ];

  return (
    <>
      <Row gutter={[25, 10]} >
        <Card className="filter-card" title="Filtros" >
          <Form form={form}>
            <Row gutter={[25, 10]} >

            {/*   <Col span={4}>
                    <Form.Item
                        hasFeedback
                        name="parentId"
                        rules={[
                        {
                            required: true,
                            message: "Debes seleccionar secretaría ejecutiva.",
                        },
                        ]}>
                        <InstitutionsSelect onlyParent onChange={setParentInstitution} />
                    </Form.Item>
              </Col>

              <Col span={4}>
                    <Form.Item
                    hasFeedback
                    name="institution"
                    rules={[
                    {
                        required: true,
                        message: "Debes seleccionar una secretaría.",
                    },
                    ]}
                    >
                    <InstitutionsSelect
                    parentId={parentInstitution}
                    onChange={setParentInstitution}
                    />
                    </Form.Item>
              </Col> */}

              <Col span={4}>
                <Form.Item name="municipio">
                  <MunicipiosSelect onChange={(v: any) => {
                    setMunicipio(v);
                    let ActvitiesToShow = activities?.filter(x => x.municipio.id === v);
                    setFilteredActivities(ActvitiesToShow);
                  }} />
                </Form.Item>
              </Col>

              <Col span={4}>
                <Form.Item name="parroquia">
                  <ParroquiaSelect municipio_id={municipio} onChange={(v: any) => {
                    let ActvitiesToShow = activities?.filter(x => x.parroquia.id === v);
                    setFilteredActivities(ActvitiesToShow);
                  }} />
                </Form.Item>
              </Col>

              <Col span={4}>
                <Form.Item name="gobernador">
                  <Select placeholder="¿Asistio el Gobernador?" onChange={(v: any) => {
                    let gobernor: any;
                    if (v === "SI") {
                      gobernor = true;
                    } else {
                      gobernor = false;
                    }
                    let ActvitiesToShow = activities?.filter(x => x.gobernador === gobernor);
                    setFilteredActivities(ActvitiesToShow);
                  }}>
                    <Select.Option value={"SI"}>Si</Select.Option>
                    <Select.Option value={"NO"}>No</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={2}>
                <Form.Item>
                  <Button onClick={() => {form.resetFields(); setFilteredActivities(activities);}} size='large' type='primary' >
                    Descartar filtros
              </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        <Col span={24}>
          {filteredActivities?.map((activity, i) => (
            <Col span={4.8}>
              <ActivityCard i={i} key={activity.id}
                activity={activity} />
            </Col>
          ))}

          {filteredActivities?.length === 0 && <Col span={4.8}>
            <Empty 
            description="No se encontró ninguna actividad."
            />
          </Col>}
        </Col>

      </Row>
    </>

    

  )
}

async function getActivities(axios: AxiosInstance): Promise<Activity[]> {
  const response = await axios.get('/activity');
  return response.data;

}
export default ActivityPage;