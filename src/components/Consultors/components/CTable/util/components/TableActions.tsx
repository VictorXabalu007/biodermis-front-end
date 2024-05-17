import { Modal } from "antd";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { HiOutlinePencilAlt } from "react-icons/hi";

import { IoMdClose } from "react-icons/io";

import './styles.css'
import { DataType } from "../consultorsData";
import { ModalNavigator } from "../../../Modal/Navigator";
import { BRAND_PURPLE } from "../../../../../../constants/classnames/classnames";



export type RecordProps = {

    record: DataType;

}

export const TableActions = () => {


    const {confirm} = Modal;
     

    const showFormModal = () => {

        confirm({

            content:<ModalNavigator />,
            okButtonProps: {className: 'hidden'}, 
            cancelButtonProps: {className: 'hidden'},
            maskClosable: true,
            closable: true,
            centered: true,
            closeIcon: <IoMdClose style={{fill: BRAND_PURPLE}} />,
            width: 500
            
        });

    }

    const handleClick = () => {

        showFormModal();
       
    }


    return (

        <div className="flex gap-2 text-xl items-center">

            <AiOutlineExclamationCircle className="text-purple-solid-600 hover:text-purple-solid-600/50" />
            <HiOutlinePencilAlt onClick={handleClick}  className="text-purple-solid-600 hover:text-purple-solid-600/50" />

        </div>
    
    )


}