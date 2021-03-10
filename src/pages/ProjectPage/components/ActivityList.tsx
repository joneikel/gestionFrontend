import { List, Avatar, Tag } from 'antd';
import { Activity } from '../../../models';

const ActivityList = ({ activities }: { activities: Activity[] }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={activities}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
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