import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"



type ButtoWrapperProps = {
    children: ReactNode,
    className?:string
}

export const ButtonWrapper = ({children,className}:ButtoWrapperProps) => {
    return (
        <div className={(twMerge('mx-auto flex-rw flex items-center gap-3',className))}>
            {children}
        </div>
    )
}