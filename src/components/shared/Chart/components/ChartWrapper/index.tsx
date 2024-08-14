


import { Card, CardProps } from "antd";



export const ChartWrapper = ({children,...rest}:CardProps) => {
    

    return (


         <Card 
         {...rest}
         bodyStyle={{
            padding:'10px 0',
            flex:1,
            minHeight:'520px',
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-between',

         }}
         >

            {children}
         </Card>
    )
}