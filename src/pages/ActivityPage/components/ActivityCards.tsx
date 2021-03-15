import { Avatar, Button, Card, Tag } from "antd";
import React from "react";
import { Activity } from "../../../models";
import moment from "moment";
import { downloadFileFromLink, moneyFormatter } from "../../../helpers";
import { PrinterFilled } from "@ant-design/icons";
import { makeImage } from "../../../hooks/makeImage";

const ActivityCards = ({ activity, i }: { activity: Activity; i: number }) => {
  return (
    <Card
      style={{ margin: '15px' }}
      className="base-card activity-card shadow-drop-center"
      cover={<img height="235" alt="actividad" src={makeImage(activity.images[0].id)} />}
    >
      <Card.Meta
        avatar={
          <Button size="large" className="activity-card-avatar">
            {activity.name}
          </Button>
        }
        description={<div className="description-text">
          Parroquia: {activity.parroquia.name}<br />
          Sector: {activity.address}<br />
          Inversión: {moneyFormatter(activity.budget_cost)}<br />
          Beneficiados: {activity.benefited_population}<br />

        </div>}
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

const images = [
  "https://ultimasnoticias.com.ve/wp-content/uploads/2020/09/plan-de-vacunacion-guarico-2.jpg",
  "https://4.bp.blogspot.com/-GWqZfnPw3M8/XNmkiR8mLcI/AAAAAAAA1uI/oTjoiloZ3IUJa_eatq_EBNgYBqat9QIvgCLcBGAs/s640/D6dXQ9cWAAA7Gbh-1.jpg",
];
