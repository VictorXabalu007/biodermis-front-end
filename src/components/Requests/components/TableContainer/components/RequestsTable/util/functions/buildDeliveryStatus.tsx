import { Tag } from "../../../../../../../shared/Tag"
import { DeliveryStatys } from "../@types/DeliveryStatus"



export const buildDeliveryStatus = (status:DeliveryStatys) => {

    switch(status) {

        case 'Em andamento':
            return (
                <Tag
                content={status}
                className="text-yeallow-solid-900 fill-yeallow-solid-900 bg-yeallow-solid-400"
                key="deliveryStatus"
                /> 
            )

        case 'Recebido':
            
            return (
                <Tag
                content={status}
                className="text-purple-solid-500 fill-purple-solid-500 bg-purple-solid-200"
                key="deliveryStatus"
                /> 
            )

    }

}