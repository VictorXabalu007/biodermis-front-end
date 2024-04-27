
import { ReactNode } from "react"
import { BORDER_GRAY } from "../../../../constants/classnames/classnames"



export const StatsCardRoot = ({children}:{children:ReactNode}) => {


    return (
        <div
        style={{border:BORDER_GRAY}}
        className="p-5 flex-1 flex rounded-md flex-col"
        >
            {children}

        </div>

    )



}