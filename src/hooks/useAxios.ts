import axios from 'axios';
/*http://api-actividades.guarico.gob.ve*/
export function useAxios() {
    return axios.create({
        baseURL: "http://192.168.10.4:3300"
    })
}