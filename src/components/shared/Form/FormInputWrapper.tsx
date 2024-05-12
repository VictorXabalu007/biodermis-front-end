import { ReactNode } from "react"



export const FormInputWrapper = ({children}:{children:ReactNode})=> {

    return (
        
        <div className="flex flex-col gap-2">
            {children}
        </div>

    )
}