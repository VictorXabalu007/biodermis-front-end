
import { Tag } from "../../shared/Tag";
import { PaymentStatus } from "../../WithdrawalRequests/util/selectOptions";
import { Requests } from "../@types/Requests";


type Props = {
    handleEditorOpen?: () => void    
    status:string
    request:Requests

}

export const buildDeliveryStatus = ({
    handleEditorOpen,
    request,
    status
}:Props) => {


    switch(status) {

        case "pendente":
            return (
                <Tag
                onClick={()=> {
                    request.statuspag === PaymentStatus.PAID ?
                    handleEditorOpen ? handleEditorOpen() : null : null
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