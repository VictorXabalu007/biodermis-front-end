import React from "react";
import { ConsultorStatus } from "./@types/StatusType";





export type Consultors = {


    tops: string,
    name: string,
    email: string;
    phone: string;
    totalFatured: number;
    status: ConsultorStatus;
    actions: React.ReactNode;

}


export const consultorsData:Consultors [] = [

    {
        
  
        tops: '1',
        name: 'Gustavo Henrique',
        email: 'gustavohenrique@gmail.com',
        phone: '(00) 0000-0000',
        totalFatured: 100000,
        status: 'ENABLE',
        actions: <></>,

    },
    {

        tops: '2',
        name: 'Macucu Henrique',
        email: 'gustavohenrique@gmail.com',
        phone: '(00) 0000-0000',
        totalFatured: 4000,
        status: 'ENABLE',
        actions: <></>,

    },
    {

     
        tops: '3',
        name: 'Gustavo Henrique',
        email: 'gustavohenrique@gmail.com',
        phone: '(00) 0000-0000',
        totalFatured: 4000,
        status: 'ENABLE',
        actions: <></>,

    },
    {

      
        tops: '4',
        name: 'Gustavo Henrique',
        email: 'gustavohenrique@gmail.com',
        phone: '(00) 0000-0000',
        totalFatured: 4000,
        status: 'DISABLE',
        actions: <></>,

    },
    {

       
        tops: '5',
        name: 'Gustavo Henrique',
        email: 'gustavohenrique@gmail.com',
        phone: '(00) 0000-0000',
        totalFatured: 4000,
        status: 'ON_APPROVAL',
        actions: <></>,

    },
    {

       
        tops: '6',
        name: 'Gustavo Henrique',
        email: 'gustavohenrique@gmail.com',
        phone: '(00) 0000-0000',
        totalFatured: 4000,
        status: 'DISABLE',
        actions: <></>,

    },
    {

     
        tops: '7',
        name: 'Gustavo Henrique',
        email: 'gustavohenrique@gmail.com',
        phone: '(00) 0000-0000',
        totalFatured: 4000,
        status: 'ON_APPROVAL',
        actions: <></>,

    },
    {

      
        tops: '8',
        name: 'Gustavo Henrique',
        email: 'gustavohenrique@gmail.com',
        phone: '(00) 0000-0000',
        totalFatured: 4000,
        status: 'ENABLE',
        actions: <></>,

    },
    {

     
        tops: '9',
        name: 'Gustavo Henrique',
        email: 'gustavohenrique@gmail.com',
        phone: '(00) 0000-0000',
        totalFatured: 4000,
        status: 'ENABLE',
        actions: <></>,

    },
    {

    
        tops: '10',
        name: 'Gustavo Henrique',
        email: 'gustavohenrique@gmail.com',
        phone: '(00) 0000-0000',
        totalFatured: 4000,
        status: 'ON_APPROVAL',
        actions: <></>,

    },

];

