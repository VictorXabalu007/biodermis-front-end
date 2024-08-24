
import axios, { AxiosInstance } from 'axios';

const createHttp = (): AxiosInstance => {


    const http = axios.create({
        baseURL: 'https://85.31.61.50:3000',
    });
    

    return http;
    
};

export const api = createHttp();