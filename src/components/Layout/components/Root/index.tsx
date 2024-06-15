
import { Layout, LayoutProps } from 'antd';
import { twMerge } from 'tailwind-merge';





export const Root = ({children,className, ...rest}:LayoutProps) => {


    return (

        <Layout {...rest} style={{background: '#F5F5F5'}} className={twMerge('bg-white',className)}>
            
            {children}

        </Layout>


    );

}