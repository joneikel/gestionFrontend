import axios from 'axios';
import UserContainer from '../unstated/UserContainer';

const route1 = "actividades-api.guarico.gob.ve";
const route2 ="192.168.10.4:3300";
const route3 = "localhost:8000";

export const baseURL = `http://${route3}/api`;
export function useAxios() {

    const user = UserContainer.useContainer();

    return axios.create({
        baseURL,
        headers: {
            Authorization: "Bearer " + user.user?.access_token
        }
    })
}
