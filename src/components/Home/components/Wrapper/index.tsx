import { ReactNode } from "react";



export const HomeWrapper = ({children}:{children:ReactNode}) => {
    return (
        <div className="flex w-full flex-col lg:flex-row gap-5">
            {children}
        </div>
    )
}