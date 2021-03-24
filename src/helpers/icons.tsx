import { cultura } from '../assets/icons/cultura';
import { deportes } from '../assets/icons/deportes';
import { economia } from '../assets/icons/economia';
import { educacion } from '../assets/icons/educacion';
import { politica } from '../assets/icons/politica';
import { salud } from '../assets/icons/salud';
import { seguridad } from '../assets/icons/seguridad';
import { serviciosPublicos } from '../assets/icons/serviciosPublicos';
import { social } from '../assets/icons/social';
import { tecnologia } from '../assets/icons/tecnologia';
import {planning} from '../assets/icons/planning';

import Icon from '@ant-design/icons';
import saludSvg from '../assets/svg-icons/salud.svg';
import educacionSvg from '../assets/svg-icons/educacion.svg';
import culturaSvg from '../assets/svg-icons/cultura.svg';
import deportesSvg from '../assets/svg-icons/deportes.svg';
import tecnologiaSvg from '../assets/svg-icons/tecnologia.svg';
import seguridadSvg from '../assets/svg-icons/seguridad.svg';
import serviciosPublicosSvg from '../assets/svg-icons/serviciosPublicos.svg';
import socialSvg from '../assets/svg-icons/social.svg';
import politicaSvg from '../assets/svg-icons/politica.svg';
import economiaSvg from '../assets/svg-icons/economia.svg';
import planningSvg from '../assets/svg-icons/planning.svg';

export const CulturaIcon = (props: any) => <Icon component={cultura} {...props} />;
export const DeportesIcon = (props: any) => <Icon component={deportes} {...props} />;
export const EconomiaIcon = (props: any) => <Icon component={economia} {...props} />;
export const EducacionIcon = (props: any) => <Icon component={educacion} {...props} />;
export const PoliticaIcon = (props: any) => <Icon component={politica} {...props} />;
export const SaludIcon = (props: any) => <Icon component={salud} {...props} />;
export const SeguridadIcon = (props: any) => <Icon component={seguridad} {...props} />;
export const ServiciosPublicosIcon = (props: any) => <Icon component={serviciosPublicos} {...props} />;
export const SocialIcon = (props: any) => <Icon component={social} {...props} />;
export const TecnologiaIcon = (props: any) => <Icon component={tecnologia} {...props} />;
export const PlanningIcon = (props: any) => <Icon component={planning} {...props} />;

export function getIconByAreaCode(code?: string) {
    const fontSize = { fontSize: 12 };
    if (code === "E005") return <SaludIcon style={fontSize} />;
    else if (code === "E001") return <PlanningIcon style={fontSize} />;
    else if (code === "E002") return <EconomiaIcon style={fontSize} />;
    else if (code === "E004") return <SocialIcon style={fontSize} />;
    else if (code === "E005") return <SaludIcon style={fontSize} />;
    else if (code === "E006") return <SeguridadIcon style={fontSize} />;
    else if (code === "E007") return <TecnologiaIcon style={fontSize} />;
    else if (code === "E009") return <SeguridadIcon style={fontSize} />;
    else if (code === "E003") return <ServiciosPublicosIcon style={fontSize} />;
    else if (code === "E011") return <PoliticaIcon style={fontSize} />;
    else return <EconomiaIcon style={fontSize} />;
}

export function getSvgIconByAreaCode(code?: string) {
    if (code === "E005") return saludSvg;
    else if (code === "E001") return planningSvg;
    else if (code === "E002") return economiaSvg;
    else if (code === "E003") return culturaSvg;
    else if (code === "E004") return deportesSvg;
    else if (code === "E005") return tecnologiaSvg;
    else if (code === "E006") return seguridadSvg;
    else if (code === "E007") return serviciosPublicosSvg;
    else if (code === "E009") return socialSvg;
    else if (code === "E010") return politicaSvg;
    else if (code === "E011") return saludSvg;
    else return saludSvg;
}