import { Modal } from "antd"
import { QueryClientProvider } from "@tanstack/react-query";
import { IoMdClose } from "react-icons/io";
import { queryClient } from "../../service/queryClient";
import { StatusModal } from "../../components/Consultors/status-update-modal";
import { colors } from "../../theme/colors";



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
            closeIcon: <IoMdClose style={{fill: colors.primaryPurple}} />,
            okButtonProps: {className: 'hover:tex'}, 
            cancelButtonProps: {className: 'hidden'},
            maskClosable: true,
        });

    }

    return {
        showStatusModal,
    }

}