import {  Modal } from "antd"
import { BsExclamationSquare } from "react-icons/bs"
import { FiPrinter } from "react-icons/fi"
import { RequestStatus } from "../Modal/RequestStatus";
import { IoMdClose } from "react-icons/io";
import { BRAND_PURPLE } from "../../../../../../../../constants/classnames/classnames";
import { RequestEditor } from "../Modal/RequestEditor";
import { ModalFooter } from "../Modal/RequestEditor/components/ModalFooter";



export const TableActions = () => {

    const { confirm } = Modal;


    const handleClose = () => {

        Modal.destroyAll();
        
    }

    const showRequestEditor = () => {

        confirm({

            content: <RequestEditor />,
            okButtonProps: {className: 'bg-brand-purple'}, 
            cancelButtonProps: {className: 'bg-white'},
            
            okText: 'confirmar',
            cancelText: 'cancelar',
            onOk() {
                //TODO
                // Implementar sistema de salvar dados depois
                
            },
            
            onCancel() {

            },
          

            footer: (

                <ModalFooter handleClose={handleClose} />
                
            ),
            width: '50%',
            
            style: {
                
                borderRadius: '0px',
                left: '25%',
                
            },

            maskClosable: true,
            
            

          });
          
    }

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
                <FiPrinter onClick={showRequestEditor} className="text-purple-solid-600 hover:text-purple-solid-600/50" />

            </div>

        </>

    )
}