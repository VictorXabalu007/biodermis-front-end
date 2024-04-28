import { IconProps } from "../../../@types/Icon/IconProps"




export const ButtonIcon = ({style,icon:Icon}:IconProps) =>{
    return (
        <Icon className = "text-2xl" style={style} />
    )
}