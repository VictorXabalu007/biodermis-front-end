import { ReactNode } from "react";



export const MoneyDataCardLeftWrapper = ({children}:{children:ReactNode}) => {

    return (
        <div className="flex gap-2">

            {children}

        </div>
    )

}