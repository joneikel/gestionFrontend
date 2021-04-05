import axios from 'axios';
import UserContainer from '../unstated/UserContainer';

const route1 = "http://actividades-api.guarico.gob.ve/api";
const route2 = "http://192.168.10.4:3300/api";
const route3 = "http://localhost:8000/api";

export const baseURL = route1;
export function useAxios() {

    const user = UserContainer.useContainer();

    return axios.create({
        baseURL,
        headers: {
            Authorization: "Bearer " + user.user?.access_token
        }
    })
}
