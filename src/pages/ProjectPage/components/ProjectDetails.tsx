import React from 'react';
import { Project } from '../../../models';
import { Descriptions, Badge, Card, Tag, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import ActivityPage from '../../ActivityPage';


const ProjectDetails = () => {

    const history = useHistory();
    const project:any = history.location.state;

    return (

            <Card>
                <Button onClick={() => history.push('/listar-proyectos')} style={{position: 'absolute', top: '15px', left: '15px'}} type='primary' >Volver</Button>
                <Descriptions title={`Detalles del Proyecto`} bordered>
                    <Descriptions.Item label="Nombre:">{project.name}</Descriptions.Item>
                    <Descriptions.Item label="Descripción:" span={2} >{project.description}</Descriptions.Item>
                    <Descriptions.Item label="¿Planificado?" span={1} >{project.isPlanified === 0 ? 'No' : 'Si'}</Descriptions.Item>
                    <Descriptions.Item label="Presupuesto según origen:">{project.budgets.map((budget:any) =><><Tag style={{padding: '2px'}} >Bs. {budget.value} {budget.budgetSource.name} </Tag><br/></>)}</Descriptions.Item>
                    <Descriptions.Item label="Presupuesto total:">
                        <Tag style={{padding: '2px'}}> 
                        Bs. 
                        {   
                            project.budgets.map( (x:any) => x.value).reduce((a:number,b:number) => {return a + b})
                            
                        }
                        </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Areas de inversión:">{project.investmentAreas.map((area:any) =><><Tag style={{padding: '2px'}}>{area.name}</Tag><br/></>)}</Descriptions.Item>
                    <Descriptions.Item label="Unidad de medida:">{project.measurement.name}</Descriptions.Item>
                    <Descriptions.Item label="Valor de medida:">{project.measurementValue}</Descriptions.Item>
                    <Descriptions.Item label="Fecha de Inicio:">{project.initDate}</Descriptions.Item>
                    <Descriptions.Item label="Fecha de Culminación:">{project.endDate ? project.endDate : 'Sin culminar'}</Descriptions.Item>                
                </Descriptions>

                <Card title="Actividades del proyecto">
                    <ActivityPage projectId={project.id} />
                </Card>
                
            </Card>

        
        
    )

}

export default ProjectDetails;