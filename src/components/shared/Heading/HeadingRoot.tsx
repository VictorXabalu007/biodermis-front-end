
import { twMerge } from "tailwind-merge"
import { TextRootProps } from "../@types/TextRootProps"




export const HeadingRoot = ({children,className}:TextRootProps) => {

    return (
        <h2 className={twMerge("mt-0 font-semibold text-[20px] text-dark-purple", className)}>

            {children}

        </h2>

    )
}