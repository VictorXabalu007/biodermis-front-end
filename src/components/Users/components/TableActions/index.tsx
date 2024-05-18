import { AiOutlineExclamationCircle } from "react-icons/ai"
import { HiOutlinePencilAlt } from "react-icons/hi"


export const TableActions = () => {

    return (
        
        <div className="flex gap-2 text-xl items-center">

            <AiOutlineExclamationCircle className="text-purple-solid-600 hover:text-purple-solid-600/50" />
            <HiOutlinePencilAlt className="text-purple-solid-600 hover:text-purple-solid-600/50" />

        </div>

    )
}