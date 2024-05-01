import { ReactNode } from "react";
import { CSSProperties } from "styled-components";
import { twMerge } from "tailwind-merge";


type ProgressCardRootProps = {
    children:ReactNode,
    className?:string,
    style?:CSSProperties
}

export const ProgressCardRoot = ({style,children,className}:ProgressCardRootProps) => {

    return (
        <div style={style} className={twMerge(`p-5 flex-1 items-center gap-3 flex rounded-md`,className)}>

            {children}

        </div>
    )
}