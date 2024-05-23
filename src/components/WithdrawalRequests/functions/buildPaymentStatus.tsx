import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import { Text } from "../../shared/Text"

import { WithdrawalActions } from "../components/WithdrawalActions"
import { PaymentStatusType } from "../components/TableHeader/util/selectOptions"



export const buildPaymentStatus = (status:PaymentStatusType) => {

    switch(status) {

        case 'PAID':
            
            return (

                <div className="flex items-start">

                    <div className="px-3 py-2 bg-green-solid-300/75 rounded-md flex items-center gap-2">

                        <Text.Root className="text-green-solid-900">
                            <Text.Content content="Pago" />
                        </Text.Root>

                        <IoMdCheckmarkCircleOutline className="text-green-solid-900 text-xl" />

                    </div>

                </div>

            )
            
        case 'PENDING':

            return (

                <WithdrawalActions />

            )
    }

}