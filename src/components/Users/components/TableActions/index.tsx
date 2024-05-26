import { AiOutlineExclamationCircle } from "react-icons/ai"
import { HiOutlinePencilAlt } from "react-icons/hi"
import { IoMdClose } from "react-icons/io";
import { BRAND_PURPLE } from "../../../../constants/classnames/classnames";
import { Modal } from "antd";
import { ModalNavigator } from "../Modal/Navigator";
import { TableActionsProps } from "../../../../@types/TableActions/TableActions";
import { UserData } from "../../../Register/RegisterConsultor/components/FormContainer";


export const TableActions = ({data, table, row}:TableActionsProps<UserData>) => {

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
        
        <div className="flex gap-2 text-xl items-center justify-center">

            <AiOutlineExclamationCircle onClick={handleReadOnlyClick}  className="text-purple-solid-600 hover:text-purple-solid-600/50" />
            <HiOutlinePencilAlt onClick={handleEditClick} className="text-purple-solid-600 hover:text-purple-solid-600/50" />

        </div>

    )
}