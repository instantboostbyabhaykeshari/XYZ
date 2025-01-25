import axios from "axios";

export const axiosInstance = axios.create({});

export default function apiConnector(method, url, bodyData){
    return axiosInstance({
        method: `${method}`,
        url: `${url}`,
        data: bodyData ? bodyData : null
    })
}