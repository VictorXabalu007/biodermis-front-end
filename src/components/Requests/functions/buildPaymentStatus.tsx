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

    }

}