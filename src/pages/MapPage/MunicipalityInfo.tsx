import { Button, Card, Col, Divider, Row, Space, Spin, Tooltip, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { AxiosInstance } from "axios";
import { useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import { Institution, Municipio } from "../../models";
import { getIconByAreaCode } from "../../helpers/icons";

const MunicipalityInfo = ({
  isOpen,
  onClose,
  municipalityCode
}: {
  isOpen: boolean;
  onClose: Function;
  municipalityCode?: string;
}) => {

  const axios = useAxios();
  const [municipio, setMunicipio] = useState<Municipio | undefined>();
  const [count, setCount] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (municipalityCode) {
      setLoading(true);
      activityCount(municipalityCode, axios)
        .then(resp => {
          setMunicipio(resp.municipio);
          setCount(resp.count);
        })
        .catch(e => console.log(e))
        .finally(() => setLoading(false));
    }
  }, [municipalityCode])

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
        overflowY: 'scroll'
      }}
    >
      {loading ? <Spin tip="cargando" /> : <Row>
        <Col span={22}>
          <h2>{municipio?.name}</h2>
        </Col>
        <Col span={2}>
          <Button type="link" icon={<CloseOutlined />} onClick={() => {
            setCount([]);
            setMunicipio(undefined);
            onClose();
          }} />
        </Col>
        <Divider />
        {count.length > 0 && < Col span={24}>
          {count.map((c: any, i: number) => <Tooltip title={c.area_name}>
            <ActivityCounterWithIcon key={i} count={c} />
          </Tooltip>)}
        </Col>}
      </Row>}
    </div >
  );
};

const ActivityCounterWithIcon = ({ count }: {
  count: {
    activity_count: number
    parent?: Institution
    parent_id: string
  }
}) => {
  return <Card>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>{getIconByAreaCode(count.parent?.code)}</div>
      <div>
        <Typography.Title>{count.activity_count}</Typography.Title>
      </div>
    </div>
    <p style={{backgroundColor: '#ccc', borderRadius: 4, padding: 2}}>{count.parent?.name}</p>
  </Card>
}

export default MunicipalityInfo;

async function activityCount(municipio_code: string, axios: AxiosInstance) {
  const response = await axios.get('activity-count-by-municipio', {
    params: {
      municipio_code
    }
  });
  return response.data;
}