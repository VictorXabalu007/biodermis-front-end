import { Card, CardProps, theme } from "antd";
import { twMerge } from "tailwind-merge";


export const CategoriesCardRoot = ({children,className,...rest}:CardProps) => {

    const {token:{colorBgContainer}} =theme.useToken();

    return (
        <Card
    
      
         className={twMerge("hover:shadow hover:cursor-pointer",className)}
         {...rest} style={{
            background: colorBgContainer,
            borderRadius: '5px',
            border: '1px solid #EFEFEF',
            minWidth: '250px',
            flex: 1
        }}>

            {children}


        </Card>
    )

}