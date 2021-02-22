import React from "react";
import { Layout } from "antd";
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


const LoginMain = () => {
  return (
    <Layout>
      <Layout.Sider width="20vw">
        <LoginForm />
      </Layout.Sider>
      <Layout.Content style={{height: "100vh", width: '80vw'}} className="login-background">
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
              speed: 2,
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
      <img className="slide-in-blurred-bottom" 
        style={{borderRadius: 140, position: 'absolute', width: 140, right: 30, top: 15}} src={deporte1}></img>
      <img className="slide-in-blurred-bottom" 
        style={{borderRadius: 140, position: 'absolute', width: 140, right: 10, top: 175}} src={deporte2}></img>
      <img className="slide-in-blurred-bottom" 
        style={{borderRadius: 140, position: 'absolute', width: 140, right: "15%", top: '35%'}} src={vial1}></img>
      <img className="slide-in-blurred-bottom" 
        style={{borderRadius: 140, position: 'absolute', width: 140, right: "65%", top: '60%'}} src={servicios1}></img>
      <img className="slide-in-blurred-bottom" 
        style={{borderRadius: 140, position: 'absolute', width: 140, right: "7%", bottom: '5%'}} src={salud1}></img>
              <img className="slide-in-blurred-bottom" 
        style={{borderRadius: 140, position: 'absolute', width: 140, right: "50%", bottom: '10%'}} src={cultura1}></img>
      <img style={{position: 'absolute', width: 350, left: "50%", top: '50%'}} src={logo}></img>
    </div>
    </>
  )
}

export default LoginMain;
