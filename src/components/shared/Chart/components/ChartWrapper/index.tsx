
import { ReactNode } from "react"
import { BORDER_GRAY } from "../../../../../constants/classnames/classnames"
import { twMerge } from "tailwind-merge"
import { theme } from "antd";



export const ChartWrapper = ({children,className}:{children:ReactNode, className?:string}) => {
    
    const {
        token: {
            colorBgContainer
        }
    } = theme.useToken();
    
    
    return (


        <div style={{border:BORDER_GRAY, background: colorBgContainer}} 
        className={twMerge("rounded-md mb-auto flex flex-col w-full",className)}
        >   

            {children}

         </div>
    )
}