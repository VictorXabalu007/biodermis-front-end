import { Modal } from "antd";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { ModalNavigator } from "../../../../../Modal/Navigator";
import { IoMdClose } from "react-icons/io";
import { BRAND_PURPLE } from "../../../../../../../../constants/classnames/classnames";



export const TableActions = () => {



     const {confirm} = Modal;
     
     const handleClose = () => {

        Modal.destroyAll();
        
    }

    const showFormModal = () => {

        confirm({

            content: <ModalNavigator />,
            okButtonProps: {className: 'hidden'}, 
            cancelButtonProps: {className: 'hidden'},
            maskClosable: true,
            closable: true,
            centered: true,
            closeIcon: <IoMdClose style={{fill: BRAND_PURPLE}} />,

        });

    }

    return (

        <div className="flex gap-2 text-xl items-center">

            <AiOutlineExclamationCircle className="text-purple-solid-600 hover:text-purple-solid-600/50" />
            <HiOutlinePencilAlt onClick={showFormModal}  className="text-purple-solid-600 hover:text-purple-solid-600/50" />

        </div>
    
    )


}