import { Avatar, Button, Card, Tag } from "antd";
import React from "react";
import { Activity } from "../../../models";
import moment from "moment";
import { downloadFileFromLink, moneyFormatter } from "../../../helpers";
import { PrinterFilled } from "@ant-design/icons";
import { makeImage } from "../../../hooks/makeImage";
import { getIconByAreaCode } from "../../../helpers/icons";

const ActivityCards = ({ activity, i }: { activity: Activity; i: number }) => {

  const main_area_code = `E0${activity.project.investment_sub_areas[0].investment_area.code}`; 
  console.log(main_area_code);
  return (
    <Card
      style={{ margin: '15px', width: '300  px'}}
      className="base-card activity-card floating-element"
      cover={<div className="activity-card-image-div"><img className="activity-card-image"  alt="actividad" src={makeImage(activity.images[0].id)} /></div>}
    >
      <Card.Meta
        title={
          <div className="card-element" >
            <span className="card-title" >
            {activity.name}
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
          {activity.parroquia.name}<br/>
          {activity.address}
        </span>
        </div>
        }
      ></Card.Meta>
      <div className="card-footer">
        <Tag color="#2961c4">{moment(activity.init_date).format("L")}</Tag>
        <Button
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
      </div>
    </Card>
  );
};

export default ActivityCards;