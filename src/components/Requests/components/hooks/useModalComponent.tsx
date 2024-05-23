import { Modal } from "antd";
import { RequestEditor } from "../RequestsTable/components/Modal/RequestEditor";



const { confirm } = Modal;

const handleClose = () => {

    Modal.destroyAll();
    
}

export const useModalComponent = () => {

    const showRequestEditor = () => {

        confirm({
    
            content: <RequestEditor handleClose={handleClose} />,
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
        
            footer: null,
            width: '50%',
            
            style: {
                
                borderRadius: '0px',
                left: '25%',
                
            },
    
            maskClosable: true,
            
            
    
          });
          
    }



    return {
        showRequestEditor
    }


}