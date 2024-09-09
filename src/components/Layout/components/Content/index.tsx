

import { Content as C } from "antd/es/layout/layout";
import { ReactNode } from "react";

export const Content = ({children}:{children: ReactNode}) => {




    return (

        <C style={{ margin: '2.3em 16px 0',marginLeft: '230px',padding:'1rem' }}>

        <div
          className="p-[0 24px]"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2em',
          }}
        >

            {children}

        </div>

      </C>

    );

}