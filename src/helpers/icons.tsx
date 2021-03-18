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
import Icon from '@ant-design/icons';

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

export function getIconByAreaCode(code: number) {
    const fontSize = { fontSize: 12 };
    if (code === 1) return <SaludIcon style={fontSize} />;
    else if (code === 2) return <EconomiaIcon style={fontSize} />;
    else if (code === 3) return <SocialIcon style={fontSize} />;
    else if (code === 4) return <EducacionIcon style={fontSize} />;
    else if (code === 5) return <CulturaIcon style={fontSize} />;
    else if (code === 6) return <DeportesIcon style={fontSize} />;
    else if (code === 7) return <TecnologiaIcon style={fontSize} />;
    else if (code === 9) return <SeguridadIcon style={fontSize} />;
    else if (code === 10) return <ServiciosPublicosIcon style={fontSize} />;
    else if (code === 11) return <PoliticaIcon style={fontSize} />;
    else return <EconomiaIcon style={fontSize} />;
}