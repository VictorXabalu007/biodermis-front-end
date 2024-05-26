import { Flex, Modal } from "antd";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { HiOutlinePencilAlt } from "react-icons/hi";

import { IoMdClose } from "react-icons/io";

import './styles.css'

import { ModalNavigator } from "../Modal/Navigator";
import { BRAND_PURPLE } from "../../../../constants/classnames/classnames";
import { ConsultorsData } from "../../hooks/useTableData";
import { Row, Table } from "@tanstack/react-table";
import { TableActionsProps } from "../../../../@types/TableActions/TableActions";




export const TableActions = ({data, row, table}:TableActionsProps<ConsultorsData>) => {

    
    const {confirm} = Modal;


    const showFormModal = (props: {readOnly: boolean}) => {

        confirm({

            content:<ModalNavigator 
                data={data} 
                isReadonly={props.readOnly} 
                table={table}
                row={row}
            />,
            okButtonProps: {className: 'hidden'}, 
            cancelButtonProps: {className: 'hidden'},
            maskClosable: true,
            closable: true,
            centered: true,
            closeIcon: <IoMdClose style={{fill: BRAND_PURPLE}} />,
            width: 500
            
        });

    }


    const handleEditClick = () => {


        showFormModal({readOnly: false});
       
       
    }

    const handleReadOnlyClick = () => {

        showFormModal({readOnly: true});

       
    }


    return (

        <Flex gap={2} justify="center" align="center" className="gap-2 text-xl">

            <AiOutlineExclamationCircle onClick={handleReadOnlyClick} className="text-purple-solid-600 hover:text-purple-solid-600/50" />
            <HiOutlinePencilAlt onClick={handleEditClick}  className="text-purple-solid-600 hover:text-purple-solid-600/50" />

        </Flex>
    
    )


}