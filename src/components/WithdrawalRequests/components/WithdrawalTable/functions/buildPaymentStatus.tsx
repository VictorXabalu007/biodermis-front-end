import { IoIosArrowForward, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Text } from "../../../../shared/Text";
import { PaymentStatus } from "../@types/PaymentStatus";
import { Button } from "../../../../shared/Button";



export const buildPaymentStatus = (status:PaymentStatus) => {

    switch(status) {

        case 'pago':
            
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
            
        case 'efetuar':

            return (

                <Button.Root className="w-2/3 font-semibold">

                    <Button.Wrapper>

                        <Button.Content content="Efetuar Pagamento" />
                        <Button.Icon icon={IoIosArrowForward } />

                    </Button.Wrapper>
                </Button.Root>

            )
    }

}