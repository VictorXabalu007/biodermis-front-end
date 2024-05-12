import { ReactNode } from "react";



export const FormGroupWapper = ({children}:{children:ReactNode}) => {
    return (
        <div className="mt-10">
            {children}
        </div>
    )
}