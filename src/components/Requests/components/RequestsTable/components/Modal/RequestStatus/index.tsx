
import { QueryClientProvider } from "@tanstack/react-query"
import { capitalizeFirstLetter } from "../../../../../../../functions/Capitalizer/capitalizeFirstLetter"
import { Heading } from "../../../../../../shared/Heading"
import { Text } from "../../../../../../shared/Text"
import { Requests } from "../../../../@types/Requests"
import { ModalProducts } from "./components/ModalProducts"
import { ModalStatus } from "./components/ModalStatus"
import { queryClient } from "../../../../../../../service/queryClient"


export const RequestStatus = ({requests}:{requests:Requests}) => {
    

    

    return (

        <div className="flex w-full flex-col p-3 gap-2">

            <div className="flex text-start items-center my-3 gap-2">
                <Heading.Root>
                    <Heading.Content content={capitalizeFirstLetter(requests.modelo)} />
                </Heading.Root>
                <Text.Root className="mt-1">
                    <Text.Content content={`${requests.id} Pedido`} />
                </Text.Root>
            </div>
     
          
            <QueryClientProvider client={queryClient}>

                     <ModalProducts
                        products={requests.products}
                    /> 
                

                    <ModalStatus 
                        requests={requests}
                    />


            </QueryClientProvider>

        </div>
        
    )


}