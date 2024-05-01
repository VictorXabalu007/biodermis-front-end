import { Heading } from "../../../../../../../../shared/Heading"
import { Text } from "../../../../../../../../shared/Text"
import { ModalProducts } from "./components/ModalProducts"
import { ModalStatus } from "./components/ModalStatus"



export const RequestStatus = () => {


    return (

        <div className="flex w-full flex-col p-3 gap-2">

            <div className="flex text-start items-center my-3 gap-2">
                <Heading.Root>
                    <Heading.Content content="Venda" />
                </Heading.Root>
                <Text.Root className="mt-1">
                    <Text.Content content="#01Pedido" />
                </Text.Root>
            </div>
     

            <ModalProducts />
            <ModalProducts />
            <ModalProducts />

            <ModalStatus />

        </div>
        
    )


}