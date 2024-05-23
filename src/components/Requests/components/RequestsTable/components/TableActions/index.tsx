import {  Modal } from "antd"
import { BsExclamationSquare } from "react-icons/bs"
import { FiPrinter } from "react-icons/fi"
import { RequestStatus } from "../Modal/RequestStatus";
import { IoMdClose } from "react-icons/io";
import { BRAND_PURPLE } from "../../../../../../constants/classnames/classnames";



const { confirm } = Modal;


export const TableActions = () => {


    const showRequestStats = () => {

        confirm({

            content: <RequestStatus />,
            closable: true,
            closeIcon: <IoMdClose style={{fill: BRAND_PURPLE}} />,
            okButtonProps: {className: 'hidden'}, 
            cancelButtonProps: {className: 'hidden'},
            width: '40%',
            maskClosable: true,
            

          });

    }


    return (
        
        <>
        
            <div className="flex gap-2 text-xl justify-center items-center">

                <BsExclamationSquare onClick={showRequestStats} className="text-purple-solid-600 hover:text-purple-solid-600/50" />
                <FiPrinter  className="text-purple-solid-600 hover:text-purple-solid-600/50" />

            </div>

        </>

    )
}