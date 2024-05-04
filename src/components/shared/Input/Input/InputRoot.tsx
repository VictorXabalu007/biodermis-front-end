import { twMerge } from "tailwind-merge";




type InputRootProps = {
    className?:string;
    children: React.ReactNode;
}

export const InputRoot = ({children,className}:InputRootProps) => {

    return (

        <div className={twMerge("flex flex-col text-start",className)}>
            {children}
        </div>
        
    );
}