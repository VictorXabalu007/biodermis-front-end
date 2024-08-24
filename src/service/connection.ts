
import axios, { AxiosInstance } from 'axios';
import { API_URL } from './url';

const createHttp = (): AxiosInstance => {


    const http = axios.create({
        baseURL: API_URL,
    });
    

    return http;
    
};

export const api = createHttp();