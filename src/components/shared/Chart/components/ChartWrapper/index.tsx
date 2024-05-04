
import { ReactNode } from "react"
import { BORDER_GRAY } from "../../../../../constants/classnames/classnames"



export const ChartWrapper = ({children}:{children:ReactNode}) => {
    return (


        <div style={{border:BORDER_GRAY}} 
        className="rounded-md mb-auto flex flex-col w-full"
        >   

            {children}

         </div>
    )
}