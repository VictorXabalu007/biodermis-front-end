
import axios from 'axios';
import { API_URL } from './url';


export const api = axios.create({
    baseURL: API_URL,
});


const token = JSON.parse(sessionStorage.getItem('token') ?? '{}');

export const get = async (url: string) => {

    if(!token) {
        throw new Error('Token não encontrado');
    }

    const res = await api.get(url,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data

}

export const post = async (url:string,payload:any) => {

    
    if(!token) {
        throw new Error('Token não encontrado');
    }

    const req = await api.post(url,payload,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return req.data

}

export const put = async (url:string,payload:any) => {

    
    if(!token) {
        throw new Error('Token não encontrado');
    }

    const req = await api.put(url,payload,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return req.data

}

export const del = async (url:string) => {

    
    if(!token) {
        throw new Error('Token não encontrado');
    }

    const req = await api.delete(url,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return req.data

}