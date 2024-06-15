import { ElementType } from "react"


type HeadingIconProps = {
    icon:ElementType,
    className?:string,
    onClick?: () => void;
}

export const HeadingIcon = ({icon:Icon,className, onClick}:HeadingIconProps) => {

    return <Icon onClick={onClick} className={className} />;
    
}