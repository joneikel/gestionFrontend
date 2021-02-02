import axios from 'axios';

export function useAxios() {
    return axios.create({
        baseURL: "http://localhost:3002"
    })
}