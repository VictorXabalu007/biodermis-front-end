import { ElementType } from "react"





export const StatsCardIcon = ({icon:Icon}:{icon:ElementType}) => {
    return (
        <div className="rounded-md p-3 bg-brand-purple/25">

            <Icon className="text-brand-purple text-2xl fw-bold" />

        </div>
    )
}