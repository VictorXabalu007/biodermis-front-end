
import { ReactNode, useEffect } from 'react';
import { S as Sider } from './components/Sider';
import { Root } from './components/Root';
import { Content } from './components/Content';
import { Header } from './components/Header';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';


type LayoutProps = {
    children:ReactNode;
}


export const Layout = ({children}:LayoutProps) => {

  const navigate = useNavigate();
  const verifyLogin = () => {
    const email = sessionStorage.getItem('email');
    if(!email){
      navigate(-1)
      notification.error({
        message:'Você não pode entrar sem não estar logado!'
      })
    }
  }

  useEffect(()=> {
    verifyLogin()
  },[])

  return (

    <Root>

      <Sider />

        <Root>

          <Header />
          
          <Content>

            {children}

          </Content>
            

        </Root>

    </Root>

  );
  
};

