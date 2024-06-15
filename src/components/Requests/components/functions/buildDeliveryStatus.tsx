import { PaymentStatus } from "../../../WithdrawalRequests/components/TableHeader/util/selectOptions";
import { Tag } from "../../../shared/Tag";
import { useModalComponent } from "../../hooks/useModalComponent";
import { Requests } from "../@types/Requests";





export const buildDeliveryStatus = (status:string,data:Requests) => {

    const {showRequestEditor} = useModalComponent({id: data.id});
    
    switch(status) {

        case 'em andamento':
            return (
                <Tag
                onClick={()=> {
                    data.statuspag === PaymentStatus.PAID ?
                    showRequestEditor() : null
                }}
                content={status}
                className="cursor-pointer text-yeallow-solid-900 fill-yeallow-solid-900 bg-yeallow-solid-400 hover:bg-yeallow-solid-400/75"
                key="deliveryStatus"
                /> 
            )

        case 'realizada':
            
            return (
                <Tag
                content={status}
                className="cursor-pointer text-purple-solid-500 fill-purple-solid-500 bg-purple-solid-200"
                key="deliveryStatus"
                /> 
            );
        

    }

}