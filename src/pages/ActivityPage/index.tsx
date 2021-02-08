import { Button, Card, Col, Row, Select, Space, Tag, Form, Empty } from 'antd';
import { AxiosInstance } from 'axios';
import React, { useEffect, useState } from 'react';
import MainTable from '../../components/tables/MainTable';
import { useAxios } from '../../hooks/useAxios';
import { Activity, Institution, Municipio, Parroquia, Project } from '../../models';
import ActivityCard from './components/ActivityCard';
import MunicipiosSelect from './components/MunicipioSelect';
import ParroquiaSelect from './components/ParroquiaSelect';
import { useHistory } from 'react-router-dom';
import { useForm } from 'antd/lib/form/Form';

const ActivityPage = ({ projectId }: { projectId?: string }) => {

  const axios = useAxios();
  const history = useHistory();
  const [form] = useForm();

  const [municipio, setMunicipio] = useState<string | undefined>();


  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState<Activity[] | undefined>();
  const [parentInstitution, setParentInstitution] = useState<string | undefined>();
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
      <Row gutter={[10, 100]}>
        {filteredActivities?.map((activity, i) => (
          <Col span={4}>
            <ActivityCard i={i}
              key={activity.id}
              activity={activity} />
          </Col>
        ))}
      </Row>
    </>
  )
}

async function getActivities(axios: AxiosInstance): Promise<Activity[]> {
  const response = await axios.get('/activity');
  return response.data;

}
export default ActivityPage;