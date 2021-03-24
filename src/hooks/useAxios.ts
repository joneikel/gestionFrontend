import axios from 'axios';
import UserContainer from '../unstated/UserContainer';
/*http://actividades-api.guarico.gob.ve/api*/
//http://192.168.10.4:3300
//http://localhost:8000/api
export const baseURL = "http://actividades-api.guarico.gob.ve/api";
export function useAxios() {

    const user = UserContainer.useContainer();

    return axios.create({
        baseURL,
        headers: {
            Authorization: "Bearer " + user.user?.access_token
        }
    })
}
