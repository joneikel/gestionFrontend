import React from "react";
import { Image, Layout } from "antd";
import LoginForm from "../../pages/LoginPage/forms/LoginForm";
import deporte1 from '../../assets/bg/deporte.png';
import deporte2 from '../../assets/bg/deporte2.png';
import vial1 from '../../assets/bg/vial.png';
import salud1 from '../../assets/bg/medicos.png';
import mapaShape from '../../assets/bg/shape_guarico.svg';
import servicios1 from '../../assets/bg/agua.png';
import cultura1 from '../../assets/bg/cultura.png';
import logo from '../../assets/bg/logo.png';
import Particles from "react-tsparticles";
import tecnologia1 from '../../assets/bg/tecnologia.png';
import siembra1 from '../../assets/bg/siembra.png';
import ganado1 from '../../assets/bg/ganaderia.png';
import siembra2 from '../../assets/bg/siembra2.png';
import siembra3 from '../../assets/bg/maiz.png';
import dgi from '../../assets/bg/dgi.png';

const LoginMain = () => {
  return (
    <Layout>
      <Layout.Sider width="25vw">
        <LoginForm />
        <Image style={{ position: 'absolute', bottom: "20px", left: "10px" }} src={dgi} width={75} />
      </Layout.Sider>
      <Layout.Content style={{ height: "100vh", width: '80vw' }} className="login-background">
        <LoginBackground />
      </Layout.Content>
    </Layout>
  );
};

const LoginBackground = () => {
  return (
    <>
      <Particles
        id="tsparticles"
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 60,
          interactivity: {
            detectsOn: "canvas",
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: false,
                mode: "repulse",
              },
              resize: true,
            }
          },
          particles: {
            color: {
              value: "#2961c4",
            },
            links: {
              color: "#2961c4",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                value_area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 5,
            },
          },
          detectRetina: true,
        }
        }
      />
      <div className="login-background">
        <h2 className="tracking-in-expand title-text">GESTIÓN DE PROYECTOS</h2>
     </div>
    </>
  )
}

export default LoginMain;
