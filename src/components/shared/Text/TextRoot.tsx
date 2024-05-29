import { twMerge } from "tailwind-merge"
import { TextRootProps } from "../@types/TextRootProps"



export const TextRoot = ({className,children}:TextRootProps) => {

    return (

        <p className={twMerge('mt-0 text-[14px] font-[500] ',className)}>
            {children}
        </p>

    )


}