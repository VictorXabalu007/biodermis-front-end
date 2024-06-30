import { Modal } from "antd";
import { RequestEditor } from "../components/RequestsTable/components/Modal/RequestEditor";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../../service/queryClient";
import { Requests } from "../components/@types/Requests";



const { confirm } = Modal;

const handleClose = () => {

    Modal.destroyAll();
    
}

type UseModalComponentProps = {
    id: number
    data:Requests
}

export const useModalComponent = ({id,data}:UseModalComponentProps) => {

    const showRequestEditor = () => {

        confirm({
    
            content:<QueryClientProvider client={queryClient}>
                  <RequestEditor id={id} data={data} handleClose={handleClose} />
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