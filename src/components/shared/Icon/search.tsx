import { CiSearch } from "react-icons/ci"
import { IconBaseProps } from "react-icons/lib"

export const SearchIcon = ({...rest}:IconBaseProps) => {

    return (
        <CiSearch {...rest} className="fill-gray-neutral-400 text-xl" />
    )
    
}