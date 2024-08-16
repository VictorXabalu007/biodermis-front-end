import { Card, CardProps, } from "antd"






export const TableWrapper = ({children, ...rest}:CardProps) => {



    return (

        <Card {...rest}>
            {children}
        </Card>


    )
}