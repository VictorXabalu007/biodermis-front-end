
import { ReactNode } from "react"
import { BORDER_GRAY } from "../../../../../constants/classnames/classnames"
import { twMerge } from "tailwind-merge"



export const ChartWrapper = ({children,className}:{children:ReactNode, className?:string}) => {
    return (


        <div style={{border:BORDER_GRAY}} 
        className={twMerge("rounded-md mb-auto flex flex-col w-full",className)}
        >   

            {children}

         </div>
    )
}