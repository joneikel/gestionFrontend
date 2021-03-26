import { Button, Card, Col, Divider, Row, Spin, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { AxiosInstance } from "axios";
import { useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import { Institution, Municipio } from "../../models";
import { getIconByAreaCode } from "../../helpers/icons";
import { Link } from "react-router-dom";

const MunicipalityInfo = ({
  isOpen,
  onClose,
  municipalityCode,
}: {
  isOpen: boolean;
  onClose: Function;
  municipalityCode?: string;
}) => {
  const axios = useAxios();
  const [municipio, setMunicipio] = useState<Municipio | undefined>();
  const [counters, setCounters] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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
      className="map-sidebar"
      style={{
        padding: isOpen ? 10 : 0,
        position: "absolute",
        right: "0px",
        width: isOpen ? "300px" : "0px",
        height: "100%",
        zIndex: 500,
        backgroundColor: "#fff",
        overflowY: "scroll",
      }}
    >
      {loading ? (
        <Spin tip="cargando" />
      ) : (
        <Row>
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
          <Divider />
          {counters.length > 0 &&
            counters.map((c: any, i: number) => (
              <Col span={24}>
                <ActivityCounterWithIcon key={i} count={c.data} />
              </Col>
            ))}
        </Row>
      )}
    </div>
  );
};

const ActivityCounterWithIcon = ({
  count,
}: {
  count: {
    programs: number;
    projects: number;
    activities: number;
    institution: Institution;
    municipio: Municipio;
  };
}) => {
  return (
    <Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <div><Typography.Text>Programas: <b>{count.programs}</b></Typography.Text></div>
          <br />
          <div>
            <Link to={`/listar-proyectos`}>
              Proyectos: <b>{count.projects}</b>
            </Link>
          </div>
          <br />
          <div><Typography.Text>Act: <b>{count.activities}</b></Typography.Text></div>
        </div>
      </div>
      <div className="map-card-icon">
        {getIconByAreaCode(count.institution.code)}
        <p style={{ backgroundColor: "#ccc", borderRadius: 4, padding: 2 }}>
          {count.institution.name}
        </p>
      </div>
    </Card>
  );
};

export default MunicipalityInfo;

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
