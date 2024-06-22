import { twMerge } from "tailwind-merge";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";



export const ModalFooterAction = ({content, className, children,type, ...rest}:PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {


    const choseClassName = () => {

        if(type==='submit') {
            return 'bg-brand-purple text-white hover:bg-brand-purple/75'
        } else if(type==='button') {
            return 'hover:bg-brand-purple border border-brand-purple text-brand-purple hover:text-white'
        }


    }


    return (

     
            <button
                style={{
         
                    padding: '.3rem',
                    minWidth: '80px',
                    borderRadius: '5px'
                }}
                className={twMerge(choseClassName(),className)} 
                {...rest}
            >
                {children}
            </button>
   

    )


}