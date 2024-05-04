import { ReactNode } from "react";



export const MoneyDataCardRoot = ({children}:{children:ReactNode}) => {

    return (

        <div>

            <div className="flex justify-between">

                {children}

            </div>

            <hr className="my-3" />

        </div>
    )

}