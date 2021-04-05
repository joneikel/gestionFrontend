import { List, Avatar, Tag, Image } from 'antd';
import { makeImage } from '../../../hooks/makeImage';
import { Activity } from '../../../models';
import logo from '../../../assets/bg/logo.png';

const ActivityList = ({ activities }: { activities: Activity[] }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={activities}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar>
              <Image src={item.images.length > 0 ? makeImage(item.images[0].id) : logo} />
            </Avatar>}
            title={<a href={`/actividad/${item.id}`}>{item.name}</a>}
            description={<>
              <Tag>{item.parroquia.municipio.name}</Tag>
              {item.init_date} {item.end_date !== item.init_date ? `/ ${item.end_date}` : ""}
            </>}
          />
        </List.Item>
      )}
    />)
}

export default ActivityList;