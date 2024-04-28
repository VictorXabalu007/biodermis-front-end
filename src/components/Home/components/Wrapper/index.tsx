import { ReactNode } from "react";



export const HomeWrapper = ({children}:{children:ReactNode}) => {
    return (
        <div className="flex w-full flex-col lg:flex-row gap-2">
            {children}
        </div>
    )
}