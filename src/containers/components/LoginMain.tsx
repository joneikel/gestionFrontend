import { Image, Layout, Card } from "antd";
import LoginForm from "../../pages/LoginPage/forms/LoginForm";
import deporte1 from '../../assets/bg/deporte.png';
import deporte2 from '../../assets/bg/deporte2.png';
import vial1 from '../../assets/bg/vial.png';
import salud1 from '../../assets/bg/medicos.png';
import servicios1 from '../../assets/bg/agua.png';
import cultura1 from '../../assets/bg/cultura.png';
import logo from '../../assets/bg/logo-sicsa-circle.png';
import Particles from "react-tsparticles";
import tecnologia1 from '../../assets/bg/tecnologia.png';
import siembra1 from '../../assets/bg/siembra.png';
import ganado1 from '../../assets/bg/ganaderia.png';
import siembra2 from '../../assets/bg/siembra2.png';
import siembra3 from '../../assets/bg/maiz.png';
import dgi from '../../assets/bg/dgi.png';
import logoSicsa from '../../assets/logo.png';
import firma from '../../assets/bg/producir_es_vencer.png';

const LoginMain = () => {
  return (
    <Layout>
      <div className="login-card-div" >
        <img className="logo-sicsa" width="200" src={logoSicsa}></img>
        <Card
          className="floating-element"
        >
          <LoginForm />
          <Image style={{ position: 'absolute', bottom: "20px", left: "10px" }} src={dgi} width={75} />
        </Card>
      </div>
      <Layout.Content style={{ height: "100vh", width: '100vw' }} className="login-background">
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
        <h2 className="tracking-in-expand title-text"></h2>
        <h6 className="tracking-in-expand subtitle-text"></h6>
        <img alt="" className="vibrate-1"
          style={{ borderRadius: 140, position: 'absolute', width: '8vw', left: '30%', top: '14%' }} src={deporte1}></img>
        <img alt="" className="vibrate-2"
          style={{ borderRadius: 140, position: 'absolute', width: '8vw', left: '87%', top: '76%' }} src={deporte2}></img>
        <img alt="" className="vibrate-1"
          style={{ borderRadius: 140, position: 'absolute', width: '10vw', left: "35%", top: '79%' }} src={vial1}></img>
        <img alt="" className="vibrate-2"
          style={{ borderRadius: 140, position: 'absolute', width: '8vw', left: "52%", top: '6%' }} src={servicios1}></img>
        <img alt="" className="vibrate-1"
          style={{ borderRadius: 140, position: 'absolute', width: '8vw', left: "60.5%", top: '78%' }} src={salud1}></img>
        <img alt="" className="vibrate-2"
          style={{ borderRadius: 140, position: 'absolute', width: '8vw', left: "26%", top: '60%' }} src={cultura1}></img>
        <img alt="" className="vibrate-1"
          style={{ borderRadius: 140, position: 'absolute', width: '10vw', left: "70%", top: '25%' }} src={tecnologia1}></img>
        <img alt="" className="vibrate-2"
          style={{ borderRadius: 140, position: 'absolute', width: '7vw', left: "70%", top: '64%' }} src={siembra1}></img>
        <img alt="" className="vibrate-1"
          style={{ borderRadius: 140, position: 'absolute', width: '8vw', left: "85%", top: '44%' }} src={ganado1}></img>
        <img alt="" className="vibrate-2"
          style={{ borderRadius: 140, position: 'absolute', width: '7vw', left: "40%", top: '45%' }} src={siembra3}></img>
        <img alt="" className="vibrate-1"
          style={{ borderRadius: 140, position: 'absolute', width: '8vw', left: "90%", top: '12%' }} src={siembra2}></img>
        <img alt="" className="logo-sicsa vibrate-1" style={{ position: 'absolute', width: '18vw', left: "53%", top: '34%' }} src={logo}></img>
        <img alt="" width="150" className="firma" style={{ position: 'absolute', left: "4.5%", bottom: '10px' }} src={firma}></img>
      </div>
    </>
  )
}

export default LoginMain;
