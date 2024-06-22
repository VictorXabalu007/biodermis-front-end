import { theme } from "antd";
import { Header as H } from "antd/es/layout/layout";
import { Heading } from "../../../shared/Heading";
import { AUTH_USER } from "../../../../constants/SessionStorageKeys/sessionStorageKeys";
import { useEffect, useState } from "react";
import { UserData } from "../../../../@types/UserData/UserData";


export const Header = ({heading}:{heading:string}) => {

    const [username, setUsername] = useState<string>('Username');

    const {

        token: { colorBgContainer },
    
      } = theme.useToken();

    
    useEffect(()=> {

        const userData:UserData = JSON.parse(sessionStorage.getItem(AUTH_USER)?? '{}');

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
            lineHeight: 1.3
        }}>

            <div>
                <Heading.Root>
                    <Heading.Content content={heading} />
                </Heading.Root> 
        
            </div>

            <div>
                <Heading.Root>
                    <Heading.Content 
                       content={username}
                     />
                </Heading.Root>  
            </div>     

        </H>


        </>


    );


}