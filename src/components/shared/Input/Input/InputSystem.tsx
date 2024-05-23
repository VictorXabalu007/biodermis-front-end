import { Input } from "antd"
import { SizeType } from "antd/es/config-provider/SizeContext"
import { InputProps } from "antd/lib"

import { twMerge } from "tailwind-merge"


interface Props extends InputProps {
    
    className?: string,


}

export const InputSystem = ({size,className, ...rest}:Props) => {


    return (
        <Input
            className={twMerge("rounded-md border py-2 border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none",className)}
            size={size as SizeType}
            {...rest} 
            
        />
    )


}