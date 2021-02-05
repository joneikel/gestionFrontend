import { Button, Tag } from 'antd';
import { AxiosInstance } from 'axios';
import React, { useEffect, useState } from 'react';
import MainTable from '../../components/tables/MainTable';
import { useAxios } from '../../hooks/useAxios';
import { Activity, Municipio, Parroquia, Project } from '../../models';

const ActivityPage = ({projectId}:{projectId?:string}) => {
    
    const axios = useAxios()

    const [loading, setLoading] = useState(false);
    const [activities,setActivities] = useState< Activity[] | undefined>();

    useEffect(()=>{
        setLoading(true);
        getActivities(axios)
        .then( (c:Activity[])=>setActivities(c))
        .catch( (e) => console.log(e))
        .finally( () => setLoading(false));
    },[])

    const columns = [
        {
            title: 'Actividad',
            dataIndex: 'name',
            key: 'name',
         },{
            title: '¿Presencia del Gobernador?',
            dataIndex: 'gobernador',
            key: 'gobernador',
            render: (g:boolean) => g == false ? (<Tag color='red' >No</Tag>) : (<Tag color='green' >Si</Tag>)
        },{
            title: 'Proyecto',
            dataIndex: 'project',
            key: 'project',
            render: (x:Project) => <span color='green' >{x.name}</span>
                
            
        },{
            title: 'Poblacion beneficiada',
            dataIndex: 'benefitedPopulation',
            key: 'benefitedPopulation',
            render: (x:any) => <span>{x}</span>
        },{
            title: 'Municipio',
            dataIndex: 'municipio',
            key: 'municipio',
            render: (x:Municipio) => <span>{x.name}</span>
        },{
            title: 'Parroquia',
            dataIndex: 'parroquia',
            key: 'parroquia',
            render: (x:Parroquia) => <span>{x.name}</span>
        }
    ];

    return (
         <MainTable loading={loading} columns={columns} dataSource={ projectId? activities?.filter( x => x.project.id === projectId ) : activities} onSearch={ (v:any) => console.log(v)} />
        )
}   

async function getActivities(axios: AxiosInstance):Promise<Activity[]>{
    const response = await axios.get('/activity');
    return response.data;

}
export default ActivityPage;