import { Modal } from "antd";
import { RequestEditor } from "../components/RequestsTable/components/Modal/RequestEditor";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../../service/queryClient";



const { confirm } = Modal;

const handleClose = () => {

    Modal.destroyAll();
    
}

type UseModalComponentProps = {
    id: number
}

export const useModalComponent = ({id}:UseModalComponentProps) => {

    const showRequestEditor = () => {

        confirm({
    
            content:<QueryClientProvider client={queryClient}>
                  <RequestEditor id={id} handleClose={handleClose} />
            </QueryClientProvider>
           ,
            okButtonProps: {className: 'bg-brand-purple'}, 
            cancelButtonProps: {className: 'bg-white'},
            
            okText: 'confirmar',
            cancelText: 'cancelar',
        
        
            footer: null,
            width: '50%',
            
            style: {
                
                borderRadius: '0px',

                
            },
    
            maskClosable: true,
            
            
    
          });
          
    }



    return {
        showRequestEditor
    }


}