import axios from 'axios';
/*http://api-actividades.guarico.gob.ve*/
export function useAxios() {
    return axios.create({
        baseURL: "http://localhost:3003"
    })
}