import { ReactNode } from "react"



export const InputRoot = ({children}:{children:ReactNode}) => {

    return (
        <div className="flex flex-col text-start">
            {children}
        </div>
    )
}