import { Button, ButtonProps } from "antd";
import { twMerge } from "tailwind-merge"




export const ButtonRoot = ({children,className, ...rest}:ButtonProps) => {

    return (

        <Button
        size="large"
        className=
        {twMerge('bg-brand-purple hover:bg-brand-purple/75 px-3 py-2 font-normal text-white flex items-center gap-2 rounded-md',
        className)} {...rest}>

          
                {children}
                    
          
        </Button>

    );

}