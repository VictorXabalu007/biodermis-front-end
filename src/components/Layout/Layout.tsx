
import { ReactNode } from 'react';
import { S as Sider } from './components/Sider';
import { Root } from './components/Root';


type LayoutProps = {
    children:ReactNode;
}


export const Layout = ({children}:LayoutProps) => {

  return (

    <Root >

      <Sider />

        <Root>
          
          {children}

        </Root>

    </Root>

  );
};

