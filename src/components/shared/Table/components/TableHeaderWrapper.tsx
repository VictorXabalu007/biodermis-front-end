import { twMerge } from "tailwind-merge";
import { FlexProps, Typography } from "antd";


type TableHeaderProps = {
    className?:string;
    children:React.ReactNode,
    heading: string;
} & FlexProps

export const TableHeaderWrapper = ({children, className, heading}:TableHeaderProps) => {

    return (

        <div className={twMerge(className, 'mb-5 gap-5 flex flex-col flex-wrap')}>

            
            <Typography.Title level={4}>
                {heading}
            </Typography.Title>


            {children}
            
        </div>

    )

}