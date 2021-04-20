import { Card, Col, Row, Form, Button, Progress, Input, message, Checkbox, Typography } from 'antd';
import { useState } from 'react';
import CustomPageHeader from '../../../components/PageHeader';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import InstitutionsSelect from '../../ActivityPage/components/InstitutionSelect';
import { useAxios } from '../../../hooks/useAxios';
import { useHistory } from 'react-router-dom';
import RoleSelect from '../../ActivityPage/components/RoleSelect';
import { User } from '../../../unstated/UserContainer';

const UserForm = () => {

  const history = useHistory();
  const axios = useAxios();
  const [loading, setLoading] = useState<boolean>();
  const [parentInstitution, setParentInstitution] = useState<string | undefined>();
  const [noAplica, setNoAplica] = useState<boolean>(false);
  const user = history.location.state as User;

  const handleSubmit = async (values: any) => {
    setLoading(true);
    if (values.password !== values.password_confirmation) {
      setLoading(false);
      return message.error("Las contraseñas no coinciden");
    }

    try {
      const response = await user ? axios.patch(`user/${user.id}`, values) : axios.post('user', values);
      message.success(`Usuario ${user ? "actualizado" : "registrado"} exitosamente`);
      history.push('/listar-usuarios');
      return response;
    } catch (error) {
      console.log(error);
      message.error(`No se pudo ${user ? "actualizar" : "registrar"} el usuario`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card title={<Typography.Title level={3}>{`${user ? "Editar" : "Nuevo"} usuario`}</Typography.Title>} className="floating-element">
      <Form layout="vertical" onFinish={handleSubmit} initialValues={user && {...user, role_id: user.role.id, parent_institution: user.institution?.parent_id}}>
        <Row gutter={10}>

          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              hasFeedback
              name="name"
              label="Nombre"
              rules={[
                {
                  required: true,
                  message: "Debe escribir el nombre del usuario.",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              hasFeedback
              name="email"
              label="Correo eléctronico"
              rules={[
                {
                  required: true,
                  message: "Debe escribir el correo electrónico del usuario.",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              hasFeedback
              name="phone"
              label="Telefono"
              rules={[
                {
                  required: true,
                  message: "Debe escribir el número de telefono del usuario.",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col lg={12} md={12} sm={24} xs={24} >
            <Form.Item
              hasFeedback
              name="role_id"
              label="Rol"
              rules={[
                {
                  required: true,
                  message: "Debe seleccionar rol",
                },
              ]}
            >
              <RoleSelect />
            </Form.Item>
          </Col>

          <Col lg={12} md={12} sm={24} xs={24} >
            <Form.Item
              hasFeedback
              name="parent_institution"
              label="Secreataría ejecutiva"
              rules={[
                {
                  required: false,
                  message: "Debe seleccionar la secretaria ejecutiva a la que pertence.",
                },
              ]}
            >
              <InstitutionsSelect
                onlyParent
                onChange={(v: string) => setParentInstitution(v)}
              />
            </Form.Item>
          </Col>

          <Col lg={3} md={3}>
            <Checkbox

              onChange={(e) => {
                setNoAplica(!noAplica);
              }}

            >
              No aplica
                </Checkbox>
          </Col>

          <Col lg={9} md={9} sm={21} xs={21} >
            { !noAplica && <Form.Item
              hasFeedback
              name="institution_id"
              label="Institución"
              rules={[
                {
                  required: true,
                  message: "Debe seleccionar la institución a la que pertence.",
                },
              ]}
            >
              <InstitutionsSelect
                parentId={parentInstitution}
                disabled={!parentInstitution}
              />
            </Form.Item>}
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              hasFeedback
              name="password"
              label="Contraseña"
              rules={[
                {
                  required: !user,
                  message: "Debe escribir la contraseña del usuario.",
                },
              ]}
            >
              <Input.Password
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              hasFeedback
              name="password_confirmation"
              label="Confirmación de contraseña"
              rules={[
                {
                  required: !user,
                  message: "Debe confirmar la contraseña del usuario.",
                },
              ]}
            >
              <Input.Password
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
          </Col>



          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} >
                {user ? 'Actualizar' : 'Registrar'}
                </Button>
            </Form.Item>
            {loading && <Progress percent={99.9} type='line' status='active' />}
          </Col>

        </Row>
      </Form>
    </Card>
  )
}

export default UserForm;