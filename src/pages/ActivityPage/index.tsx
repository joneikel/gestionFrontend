import { Col, Row, Tag, Space } from 'antd';
import { AxiosInstance } from 'axios';
import React, { useEffect, useState } from 'react';
import MainTable from '../../components/tables/MainTable';
import { useAxios } from '../../hooks/useAxios';
import { Activity, Parroquia, Project } from '../../models';
import ActivityCards from './components/ActivityCards';
import Filters from './components/ActivityFilters';

const ActivityPage = ({ projectId, projectDetails }: { projectId?: string, projectDetails?: boolean }) => {

  const axios = useAxios();

  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState<Activity[] | undefined>();
  const [filters, setFilters] = useState({
    institution_id: undefined,
    municipio_id: undefined,
    parroquia_id: undefined,
    gobernador: undefined,
    project_id: projectId
  });

  useEffect(() => {
    setLoading(true);
    getActivities(axios, filters)
      .then((c: Activity[]) => { setActivities(c); })
      .catch((e) => console.log(e))
      .finally(() => {setLoading(false); console.log(activities);});
  }, []);

  const columns = [
    {
      title: 'Actividad',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '¿Presencia del Gobernador?',
      dataIndex: 'gobernador',
      key: 'gobernador',
      align: 'center',
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
      dataIndex: 'benefited_population',
      key: 'benefitedPopulation',
      align: 'center',
      render: (benefitedPopulation: number, record: Activity) => <span>{benefitedPopulation}/{record.estimated_population}</span>
    }, {
      title: 'Municipio',
      dataIndex: 'parroquia',
      key: 'municipio',
      render: (parroquia: Parroquia) => <span>{parroquia.municipio.name}</span>
    }, {
      title: 'Parroquia',
      dataIndex: 'parroquia',
      key: 'parroquia',
      render: (parroquia: Parroquia) => <span>{parroquia.name}</span>
    }
  ];

  return (
    <>
      <Row gutter={10}>
        <Col span={24}>
          <Filters onChange={(f: any) => {
            setLoading(true);
            getActivities(axios, { ...filters, ...f })
              .then((c: Activity[]) => { setActivities(c); })
              .catch((e) => console.log(e))
              .finally(() => setLoading(false));
          }} />
        </Col>
        <Col span={24}>
          { projectDetails === true ? <MainTable onSearch={() => null} loading={loading} dataSource={activities} columns={columns} /> :
          activities && activities.length > 0 && <Space>{activities.map((act) => <ActivityCards activity={act} i={1} />)}</Space> }
        </Col>
      </Row>
    </>
  )
}

async function getActivities(axios: AxiosInstance, params?: any): Promise<Activity[]> {
  const response = await axios.get('/activity', {
    params: params || null
  });
  return response.data;

}
export default ActivityPage;