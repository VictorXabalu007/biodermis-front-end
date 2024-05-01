import { twMerge } from "tailwind-merge";




type InpytRootProps = {
    className?:string;
    children: React.ReactNode;
}

export const InputRoot = ({children,className}:InpytRootProps) => {

    return (
        <div className={twMerge("flex flex-col text-start",className)}>
            {children}
        </div>
    )
}