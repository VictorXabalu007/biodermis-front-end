
import { RiArrowUpDownLine } from "react-icons/ri"
import { twMerge } from "tailwind-merge"


type IconProps = {
    className?:string
}

export const ArrowUpDownIcon = ({className}:IconProps) => {


    return (
        <RiArrowUpDownLine  className={twMerge("text-lg hover:text-brand-purple/50 text-brand-purple",className)} />
    )

}