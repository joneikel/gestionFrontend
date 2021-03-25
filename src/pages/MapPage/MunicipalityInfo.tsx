import { Button, Card, Col, Divider, Row, Spin, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { AxiosInstance } from "axios";
import { useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import { Institution, Municipio } from "../../models";
import { getIconByAreaCode } from "../../helpers/icons";

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
      {
        countPPA(institutionCodes, municipalityCode, axios)
          .then((counters) => setCounters(counters))
          .catch((err) => console.log(err))
          .finally(() => setLoading(false));
      }
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
        <div>
          <Typography.Text>Programa: {count.programs}</Typography.Text>
          <br />
          <Typography.Text>Proyecto: {count.projects}</Typography.Text>
          <br />
          <Typography.Text>Act.: {count.activities}</Typography.Text>
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
    axios.get(`count-activities/${institutionId}/${municipioId}`)
  );
  return Promise.all(requests);
}
