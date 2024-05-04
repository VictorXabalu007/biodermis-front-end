import { ButtonHTMLAttributes, ReactNode } from "react"
import { twMerge } from "tailwind-merge"



interface ButtonRootProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode,
    className?:string
}

export const ButtonRoot = ({children,className, ...rest}:ButtonRootProps) => {

    return (

        <button className=
        {twMerge('bg-brand-purple hover:bg-brand-purple/75 px-3 py-2 font-normal text-white flex items-center gap-2 rounded-md',
        className)} {...rest}>

          

                    {children}
                    
          
        </button>

    );

}