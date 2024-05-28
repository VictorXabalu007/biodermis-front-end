
import axios, { AxiosInstance } from 'axios';

const createHttp = (): AxiosInstance => {

    const URL = '';
    
    const http = axios.create({
        baseURL: URL,
    });

    return http;
    
};

export const http = createHttp();