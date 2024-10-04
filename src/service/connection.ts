
import axios from 'axios';
import { API_URL } from './url';
import { getHeaders } from './getHeaders';

const http = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const api = http;

const headers = getHeaders();

export const get = async (url: string) => {

    const res = await api.get(url,{
        headers
    });

    return res.data

}

export const post = async (url:string,payload:any) => {

    const req = await api.post(url,payload,{
        headers
    });

    return req.data

}

export const put = async (url:string,payload:any) => {

    const req = await api.put(url,payload,{
        headers
    });

    return req.data

}

export const del = async (url:string) => {

    const req = await api.delete(url,{
        headers
    });

    return req.data


}