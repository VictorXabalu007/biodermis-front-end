
import { ReactNode } from "react"
import { BORDER_GRAY } from "../../../../constants/classnames/classnames"
import { theme } from "antd"



export const StatsCardRoot = ({children}:{children:ReactNode}) => {

    const {
        token: {
            colorBgContainer
        }
    } = theme.useToken();


    return (
        <div
        style={{border:BORDER_GRAY, background: colorBgContainer}}
        className="p-5 flex-1 flex rounded-md flex-col"
        >
            {children}

        </div>

    )



}