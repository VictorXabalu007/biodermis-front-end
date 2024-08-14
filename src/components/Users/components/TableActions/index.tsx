
import { HiOutlinePencilAlt } from "react-icons/hi"
import { IoMdClose } from "react-icons/io";
import { BRAND_PURPLE } from "../../../../constants/classnames/classnames";
import { Modal } from "antd";

import { TableActionsProps } from "../../../../@types/TableActions/TableActions";
import { ModalNavigator } from "../../../shared/Modal/Navigator";
import { UserCredentials } from "../../../../@types/UserData/UserData";
import { UserRole } from "../../../../util/userRole";


export const TableActions = ({data, table, row}:TableActionsProps<UserCredentials>) => {

    const {confirm} = Modal;


    const showFormModal = (props: {readOnly: boolean}) => {

        confirm({

            content:
            <ModalNavigator 
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

       if(data.cargo_id===UserRole.USER) {
        showFormModal({readOnly: true})
       } else {
        showFormModal({readOnly: false});
       }
       
    }



    return (
        
        <div className="flex gap-2 text-xl items-center justify-center">

            <HiOutlinePencilAlt onClick={handleEditClick} className="text-purple-solid-600 hover:text-purple-solid-600/50" />

        </div>

    )
}