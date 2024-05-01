import { Tag } from "../../../../../../../shared/Tag"
import { PaymentStatus } from "../@types/PaymentStatus"


export const buildPaymentStatus = (status:PaymentStatus) => {

    switch(status) {

        case 'Aguardando':
            return (
                <Tag
                content={status}
                className="text-yeallow-solid-900 fill-yeallow-solid-900 bg-yeallow-solid-400"
                key="paymentStatus"
                /> 
            )

        case 'Aprovado':
            return (
                <Tag
                content={status}
                className="text-green-solid-900 fill-green-solid-900 bg-green-solid-300"
                key="paymentStatus"
                /> 
            )

    }

}