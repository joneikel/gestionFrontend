import { Avatar, Button, Card, Tag, Tooltip } from "antd";
import { EnvironmentTwoTone } from "@ant-design/icons";
import { Activity } from "../../../models";
import moment from "moment";
import { downloadFileFromLink } from "../../../helpers";
import { PrinterFilled, EditFilled } from "@ant-design/icons";
import { makeImage } from "../../../hooks/makeImage";
import { getIconByAreaCode } from "../../../helpers/icons";
import logo from '../../../assets/bg/logo.png';
import { useHistory } from "react-router";
import { useScope } from "../../../hooks/useScope";

const ActivityCards = ({ activity, i }: { activity: Activity; i: number }) => {

  const history = useHistory();


  const main_area_code = `E0${activity.project.investment_sub_areas[0].investment_area.code}`;
  const hasImages = activity.images[0]?.id ? true : false;
  console.log(main_area_code);
  return (
    <Card
      style={{ margin: '15px', width: '300  px' }}
      className="base-card activity-card floating-element"
      cover={<div className="activity-card-image-div">
        <img className="activity-card-image" alt="actividad" src={ hasImages ? makeImage(activity.images[0]?.id) : logo } />
        </div>}
    >
      <Card.Meta
        title={
          <div className="card-element" >
            <span className="card-title" >
              <Tooltip title={activity.name.length > 30 ? activity.name : ''} >
                {activity.name.substr(0, 30)}{activity.name.length > 30 ? '...' : ''}
              </Tooltip>

            </span>
          </div>
        }
        avatar={
          <Avatar size={64} className="activity-card-avatar">
            {getIconByAreaCode(main_area_code)}
          </Avatar>
        }
        description={
          <div className="card-element" >
            <span className="description-text">
              <EnvironmentTwoTone /> {activity.parroquia.name}<br />
              {activity.address}
            </span>
          </div>
        }
      ></Card.Meta>
      <div className="card-footer">
        <Tag color="#2961c4">{moment(activity.init_date).format("L")}</Tag>

        <div>

          <Button
            className="activity-card-btn"
            type="primary"
            icon={<PrinterFilled />}
            size="small"
            onClick={() =>
              downloadFileFromLink(
                `http://service-reports-activities.guarico.gob.ve/report/${activity.id}/activity/pdf`,
                activity.name,
                "pdf"
              )
            }
          />
          {useScope("activities:update") && <Button
            className="activity-card-btn"
            type="primary"
            icon={<EditFilled />}
            size="small"
            onClick={() => history.push("/editar-actividad", activity)}
          />}
        </div>

      </div>
    </Card>
  );
};

export default ActivityCards;