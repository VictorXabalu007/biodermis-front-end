import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";


type ProgressCardRootProps = {
    children:ReactNode,
    className?:string,
}

export const ProgressCardRoot = ({children,className}:ProgressCardRootProps) => {

    return (
        <div className={twMerge("p-5 flex-1 items-center gap-3 flex rounded-md",className)}>

            {children}

        </div>
    )
}