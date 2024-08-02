import { Flex, Modal } from "antd";
import { HiOutlinePencilAlt } from "react-icons/hi";

import { IoMdClose } from "react-icons/io";

import './styles.css'

import { ModalNavigator } from "../../../shared/Modal/Navigator";
import { BRAND_PURPLE } from "../../../../constants/classnames/classnames";
import { TableActionsProps } from "../../../../@types/TableActions/TableActions";
import { UserCredentials } from "../../../../@types/UserData/UserData";

export const TableActions = ({data, row, table}:TableActionsProps<UserCredentials>) => {

    
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



    return (

        <Flex gap={2} justify="center" align="center" className="gap-2 text-xl">

            <HiOutlinePencilAlt onClick={handleEditClick}  className="text-purple-solid-600 hover:text-purple-solid-600/50" />

        </Flex>
    
    )


}