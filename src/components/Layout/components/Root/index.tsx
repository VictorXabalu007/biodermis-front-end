
import { Layout } from 'antd';
import {  ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';



type RootProps = {
    children:ReactNode;
    className?:string;
}

export const Root = ({children,className}:RootProps) => {


    return (

        <Layout className={twMerge('bg-white',className)}>
            
            {children}

        </Layout>


    );

}