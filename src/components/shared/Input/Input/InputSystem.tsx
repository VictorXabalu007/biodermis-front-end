import { Input } from "antd"
import { SizeType } from "antd/es/config-provider/SizeContext"
import { InputHTMLAttributes, ReactNode } from "react"
import { twMerge } from "tailwind-merge"



interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    
    icon?: ReactNode
    className?: string,
}

export const InputSystem = ({size,icon,className, ...rest}:InputProps) => {


    return (
        <Input
            className={twMerge("rounded-md border border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none",className)}
            size={size as SizeType}
            suffix={icon} 
            {...rest} 
        />
    )


}