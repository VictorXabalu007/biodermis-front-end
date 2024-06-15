
import axios, { AxiosInstance } from 'axios';

export const URL = 'http://localhost:3000';

const createHttp = (): AxiosInstance => {

   
    
    const http = axios.create({
        baseURL: URL,
    });
    

    return http;
    
};

export const api = createHttp();