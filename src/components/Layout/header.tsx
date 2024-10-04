import { theme } from "antd";
import { Header as H } from "antd/es/layout/layout";
import { AUTH_USER } from "../../constants/sessionStorageKeys";
import { useEffect, useState } from "react";
import { useStateTheme } from "../../context/ThemeProvider";
import Title from "../shared/Typography/typography-title";


export const Header = () => {

    const [username, setUsername] = useState<string>('Username');
    const {title} = useStateTheme();

    const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);

    useEffect(()=> {

      const handleResize = () => {
        setInnerWidth(window.innerWidth)
      }

      window.addEventListener('resize',handleResize)

      return () => window.removeEventListener('resize', handleResize)

    },[innerWidth])

    const {

        token: { colorBgContainer },
    
      } = theme.useToken();

    
    useEffect(()=> {

        const userData:User = JSON.parse(sessionStorage.getItem(AUTH_USER)?? '{}');

        if(userData) {
            setUsername(userData.usuario.nome);
        }

    },[username]);

      
    return (

        <>

        <H style={{ 
            background: colorBgContainer,
            height: '96px', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '2rem',
            lineHeight: 1.3,
            marginLeft:innerWidth < 762 ? 0 : '200px',
            position:"sticky",
            top:0,
            zIndex:100

        }}>

            <div>
                <Title>
                    {title} 
                </Title> 
        
            </div>

            <div>
            <Title>
                    {username} 
                </Title> 
            </div>     

        </H>


        </>


    );


}