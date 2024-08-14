

import { Card, CardProps } from "antd"



export const StatsCardRoot = ({children,style,...rest}:CardProps) => {

    return (
    
        <Card
        style={{
            flex: 1,
            ...style
        }}
         {...rest}>

            {children}

        </Card>

    );


}