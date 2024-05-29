
import axios, { AxiosInstance } from 'axios';

const createHttp = (): AxiosInstance => {

    const URL = 'http://localhost:3000';
    
    const http = axios.create({
        baseURL: URL,
    });

    return http;
    
};

export const api = createHttp();