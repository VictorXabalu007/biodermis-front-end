
import { Layout } from 'antd';
import {  ReactNode } from 'react';



type RootProps = {
    children:ReactNode;
}

export const Root = ({children}:RootProps) => {


    return (

        <Layout style={{background: '#FFF'}}>

            {children}

        </Layout>


    );

}