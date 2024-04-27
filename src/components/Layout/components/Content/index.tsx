
import { theme } from "antd";
import { Content as C } from "antd/es/layout/layout";
import { ReactNode } from "react";

export const Content = ({children}:{children: ReactNode}) => {

    const {

        token: { colorBgContainer, borderRadiusLG },
    
      } = theme.useToken();


    return (

        <C style={{ margin: '2.3em 16px 0' }}>

        <div
          style={{
            padding: 24,
            minHeight: 'auto',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            display: 'flex',
            flexDirection: 'column',
            gap: '2em'
          }}
        >

            {children}

        </div>

      </C>

    );

}