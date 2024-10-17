
import { Layout, LayoutProps, notification } from 'antd';
import { twMerge } from 'tailwind-merge';
import { AUTH_USER } from '../../constants/sessionStorageKeys';
import { useEffect } from 'react';
import { UserRole } from '../../util/userRole';
import { useLocation, useNavigate } from 'react-router-dom';
import { DEFAULT_PATH, REQUESTS, WITHDRAWAL } from '../../constants/paths';





export const Root = ({children,className, ...rest}:LayoutProps) => {


    const user = JSON.parse(sessionStorage.getItem(AUTH_USER) ?? '{}');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=> {

        if(user){
            const isStock = user.usuario.cargo_id === UserRole.STOCK;
            if(isStock){
                navigate(REQUESTS)
            }
            const isManager = user.usuario.cargo_id === UserRole.MANAGER;
            if(isManager && location.pathname === WITHDRAWAL) {
                navigate(-1)
            }
            const isConsultor = user.usuario.cargo_id === UserRole.CONSULTOR;
            if(isConsultor) {
                navigate(DEFAULT_PATH)
                notification.error({
                    message:'Consultores não possuem acesso ao dashboard!!'
                })
            }
            const isUser = user.usuario.cargo_id === UserRole.USER
            if(isUser) {
                navigate(DEFAULT_PATH)
                notification.error({
                    message:'Clientes não possuem acesso ao dashboard!!'
                })
            }
            
        }

    },[user])
    

    return (

        <Layout {...rest} style={{background: '#F5F5F5'}} className={twMerge('bg-white',className)}>
            
            {children}

        </Layout>


    );

}