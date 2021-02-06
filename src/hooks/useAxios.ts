import axios from 'axios';
/*http://api-actividades.guarico.gob.ve*/
//http://192.168.10.4:3300
export function useAxios() {
    return axios.create({
        baseURL: "http://190.205.43.251:3300"
    })
}