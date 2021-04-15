import { makeImage } from "../../hooks/makeImage";
import { Activity } from "../../models";
import logo from "../../assets/bg/logo.png";
import moment from "moment";
import { StarFilled } from "@ant-design/icons";
import { Tooltip } from "antd";

const MapActivityPopup = ({ activity }: { activity: Activity }) => {
  const hasImages = activity.images[0]?.id ? true : false;

  return (
    <div style={{ minWidth: 150, minHeight: 150 }}>
      <img
        width="150px"
        className="map-activity-popup-image"
        alt="actividad"
        src={hasImages ? makeImage(activity.images[0]?.id) : logo}
      />
      <p style={{ paddingTop: 105 }}>{activity.name}</p>
      <p>
        <span style={{ color: "#888686" }}>
          {activity.parroquia.municipio.name}
        </span>
        <br />
        <span style={{ color: "#888686" }}>{activity.parroquia.name}</span>
        <br />
        <span style={{ color: "#888686" }}>
          {moment(activity.init_date).format("L")}
        </span>
      </p>
      {activity.gobernador && (
        <Tooltip title="Con asistencia del Gobernador">
          <StarFilled className="g-assistance" />
        </Tooltip>
      )}
    </div>
  );
};

export default MapActivityPopup;
