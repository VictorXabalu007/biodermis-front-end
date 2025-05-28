import { Tag } from "../../shared/Tag"



export const buildPaymentStatus = (status:string) => {

    
    switch(status) {

        case 'aguardando':
            return (
                <Tag
                content={status}
                className="text-yeallow-solid-900 fill-yeallow-solid-900 bg-yeallow-solid-400"
                key="statuspag"
                /> 
            )

        case 'realizado':
            return (
                <Tag
                content={status}
                className="text-green-solid-900 fill-green-solid-900 bg-green-solid-300"
                key="statuspag"
                /> 
            )
        
        case 'recusado':
            return (
                <Tag
                content={status}
                className="text-red-solid-950 fill-red-solid-950 bg-red-solid-400"
                key="statuspag"
                /> 
            )
        default:
            return (
                <Tag
                content={status}
                className="text-gray-900 fill-gray-900 bg-gray-neutral-200"
                key="statuspag"
                /> 
            )
    }

}