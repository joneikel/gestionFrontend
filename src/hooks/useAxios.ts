import axios from 'axios';
/*http://actividades-api.guarico.gob.ve/api*/
//http://192.168.10.4:3300
export const baseURL = "http://localhost:8001/api";
export function useAxios() {
    return axios.create({
        baseURL
    })
}
