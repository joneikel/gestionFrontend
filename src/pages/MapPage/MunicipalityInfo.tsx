import { Button, Card, Col, Row, Spin, Switch, Tooltip, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { AxiosInstance } from "axios";
import { useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import { Institution, Municipio } from "../../models";
import { getIconByAreaCode } from "../../helpers/icons";
import { Link } from "react-router-dom";
import { useMap } from "react-leaflet";
import { ActivityCardData } from './';

const MunicipalityInfo = ({
  isOpen,
  onClose,
  municipalityCode,
  onProjectsClick,
  onLoad,
  onUnload,
  checkedIntitutions
}: {
  isOpen: boolean;
  onClose: Function;
  municipalityCode?: string;
  onProjectsClick: ({ institution_id, municipio_id }: ActivityCardData) => void,
  onLoad: ({ institution_id, municipio_id }: ActivityCardData) => void,
  onUnload: ({ institution_id, municipio_id }: ActivityCardData) => void,
  checkedIntitutions: ActivityCardData[]
}) => {
  const axios = useAxios();
  const [municipio, setMunicipio] = useState<Municipio | undefined>();
  const [counters, setCounters] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const map = useMap();

  const institutionCodes = [
    "E001",
    "E002",
    "E003",
    "E004",
    "E005",
    "E006",
    "E008",
  ];

  useEffect(() => {
    if (municipalityCode) {
      setLoading(true);
      countPPA(institutionCodes, municipalityCode, axios)
        .then((counters) => {
          setCounters(counters);
          setMunicipio(counters[0].data.municipio);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [municipalityCode]);

  return (
    <div
      onWheelCapture={e => {
        e.stopPropagation();
      }}
      onMouseOver={e => {
        map.dragging.disable();
      }}
      onMouseLeave={e => {
        map.dragging.enable();
      }}
      className="map-sidebar"
      style={{
        display: loading ? 'grid' : 'inherit',
        placeContent: loading ? 'center' : 'inherit',
        padding: isOpen ? 10 : 0,
        width: isOpen ? "30%" : "0px",
      }}
    >
      {loading ? (
        <Spin tip="cargando" />
      ) : (
        <Row gutter={[0, 10]}>
          <Col span={22}>
            <h2>{municipio?.name}</h2>
          </Col>
          <Col span={2}>
            <Button
              type="link"
              icon={<CloseOutlined />}
              onClick={() => {
                setCounters([]);
                setMunicipio(undefined);
                onClose();
              }}
            />
          </Col>
          {counters.length > 0 &&
            counters.map((c: any, i: number) => (
              <Col span={24}>
                <ActivityCounterWithIcon
                  checkedInstitutions={checkedIntitutions}
                  onUnload={onUnload}
                  onLoad={onLoad}
                  onProjectsClick={onProjectsClick}
                  key={i}
                  count={c.data} />
              </Col>
            ))}
        </Row>
      )}
    </div>
  );
};

const ActivityCounterWithIcon = ({
  count,
  onProjectsClick,
  onLoad,
  onUnload,
  checkedInstitutions
}: {
  onProjectsClick: ({ institution_id, municipio_id }: ActivityCardData) => void,
  onLoad: ({ institution_id, municipio_id }: ActivityCardData) => void,
  onUnload: ({ institution_id, municipio_id }: ActivityCardData) => void,
  checkedInstitutions: ActivityCardData[],
  count: {
    programs: number;
    projects: number;
    activities: number;
    institution: Institution;
    municipio: Municipio;
  };
}) => {
  return (
    <Card
      headStyle={{ padding: 2.5 }}
      title={<span style={{ fontSize: 12 }}>{count.institution.short_name}</span>}
      extra={
        <ActivityLoader
          defaultChecked={checkedInstitutions.some(ci => (ci.institution_id === count.institution.id && ci.municipio_id === count.municipio.id))}
          municipio_id={count.municipio.id}
          onUnload={onUnload}
          onLoad={(v: any) => {
            onLoad(v);
          }}
          institution_id={count.institution.id}
        />
      }>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >

        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <div>
            <Typography.Text>
              Programas: <b>{count.programs}</b>
            </Typography.Text>
          </div>
          <br />
          <div>
            <Link to="#" onClick={() => onProjectsClick({
              municipio_id: count.municipio.id,
              institution_id: count.institution.id
            })} type="link">
              Proyectos: <b>{count.projects}</b>
            </Link>
          </div>
          <br />
          <div><Typography.Text>Act: <b>{count.activities}</b></Typography.Text></div>
        </div>
      </div>
      <div className="map-card-icon">
        {/*  {getIconByAreaCode(count.institution.code)} */}
      </div>
    </Card >
  );
};

export default MunicipalityInfo;

const ActivityLoader = ({ onLoad, onUnload, institution_id, municipio_id, defaultChecked }:
  { onLoad: Function, onUnload: Function, institution_id: string, municipio_id: string, defaultChecked: boolean }) => {

  const onSwitchChange = (a: boolean) => {
    if (a) {
      onLoad({ institution_id, municipio_id });
    } else {
      onUnload({ institution_id, municipio_id });
    }
  }

  return <Tooltip trigger={"hover"} title="Mostrar actividades">
    <Switch
      checked={defaultChecked}
      size="small"
      onChange={onSwitchChange} defaultChecked={false} />
  </Tooltip>
}



async function countPPA(
  institutionIds: string[],
  municipioId: string,
  axios: AxiosInstance
) {
  const requests = institutionIds.map((institutionId: string) =>
    axios.get<{
      programs: number;
      projects: number;
      activities: number;
      institution: Institution;
      municipio: Municipio;
    }>(`count-activities/${institutionId}/${municipioId}`)
  );
  return Promise.all(requests);
}
