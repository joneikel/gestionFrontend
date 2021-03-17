import { Button, Col, Divider, Row } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const MunicipalityInfo = ({
  isOpen,
  onClose,
  municipalityCode
}: {
  isOpen: boolean;
  onClose: Function;
  municipalityCode?: string;
}) => {
  return (
    <div
      className="map-sidebar"
      style={{
        padding: isOpen ? 10 : 0,
        position: "absolute",
        right: "0px",
        width: isOpen ? "500px" : "0px",
        height: "100%",
        zIndex: 500,
        backgroundColor: "#fff",
      }}
    >
      <Row>
        <Col span={22}>
          {municipalityCode}
        </Col>
        <Col span={2}>
          <Button type="link" icon={<CloseOutlined />} onClick={() => onClose()} />
        </Col>
        <Divider />
      </Row>
    </div>
  );
};
export default MunicipalityInfo;
