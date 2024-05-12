import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"


type FormGroupProps = {
    className?:string,
    children:ReactNode
}

export const FormInputGroup = ({children,className}:FormGroupProps) => {


    return (

        <div className={twMerge("grid mt-2 grid-cols-2 gap-5",className)}>
            {children}
        </div>


    )

}