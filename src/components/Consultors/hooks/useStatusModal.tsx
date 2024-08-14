import { Modal } from "antd"
import { UserCredentials } from "../../../@types/UserData/UserData";
import { StatusModal } from "../status-update-modal";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../../service/queryClient";
import { IoMdClose } from "react-icons/io";
import { BRAND_PURPLE } from "../../../constants/classnames/classnames";



export const useStatusModal = ({data}:{data:UserCredentials}) => {
    
    const {confirm} = Modal;

    const handleClose = ()=>{
        Modal.destroyAll();
    }

    const showStatusModal = () => {
        
        confirm({
            content: 
            <QueryClientProvider client={queryClient}>

                <StatusModal
                    data={data}
                    handleClose={handleClose}
                 />

            </QueryClientProvider>,
            footer: null,
            closable: true,
            closeIcon: <IoMdClose style={{fill: BRAND_PURPLE}} />,
            okButtonProps: {className: 'hover:tex'}, 
            cancelButtonProps: {className: 'hidden'},
            maskClosable: true,
        });

    }

    return {
        showStatusModal,
    }

}