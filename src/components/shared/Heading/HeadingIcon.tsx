import { ElementType } from "react"


type HeadingIconProps = {
    icon:ElementType,
    className?:string,
}

export const HeadingIcon = ({icon:Icon,className}:HeadingIconProps) => {

    return <Icon className={className} />;
    
}