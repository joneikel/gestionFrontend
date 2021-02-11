import axios from 'axios';
/*http://actividades-api.guarico.gob.ve*/
//http://192.168.10.4:3300
export function useAxios() {
    return axios.create({
        baseURL:"http://actividades-api.guarico.gob.ve/api/"
    })
}
