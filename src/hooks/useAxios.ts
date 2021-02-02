import axios from 'axios';

export function useAxios() {
    return axios.create({
        baseURL: "http://api-actividades.guarico.gob.ve"
    })
}