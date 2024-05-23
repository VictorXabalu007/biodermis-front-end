
import { Tag } from "../../../../../shared/Tag";
import { useModalComponent } from "../../../hooks/useModalComponent";
import { DeliveryStatys } from "../@types/DeliveryStatus"



export const buildDeliveryStatus = (status:DeliveryStatys) => {

    const {showRequestEditor} = useModalComponent();

    switch(status) {

        case 'Em andamento':
            return (
                <Tag
                onClick={showRequestEditor}
                content={status}
                className="cursor-pointer text-yeallow-solid-900 fill-yeallow-solid-900 bg-yeallow-solid-400 hover:bg-yeallow-solid-400/75"
                key="deliveryStatus"
                /> 
            )

        case 'Recebido':
            
            return (
                <Tag
                onClick={showRequestEditor}
                content={status}
                className="cursor-pointer text-purple-solid-500 fill-purple-solid-500 bg-purple-solid-200"
                key="deliveryStatus"
                /> 
            );
        

    }

}