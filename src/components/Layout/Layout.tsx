
import { ReactNode } from 'react';
import { S as Sider } from './components/Sider';
import { Root } from './components/Root';
import { Content } from './components/Content';
import { Header } from './components/Header';


type LayoutProps = {
    children:ReactNode;
}


export const Layout = ({children}:LayoutProps) => {

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

