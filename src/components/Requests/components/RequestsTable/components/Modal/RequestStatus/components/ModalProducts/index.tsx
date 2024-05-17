import { Heading } from "../../../../../../../../shared/Heading"
import { Text } from "../../../../../../../../shared/Text"

export const ModalProducts = () => {


    return (

        <div className="my-2">

                <div className="flex justify-between gap-2">
                    
                    <div className="flex gap-2">

                        <div className="bg-gray-neutral-100 px-12 py-6 rounded-md">


                        </div>

                        <div className="flex flex-col text-start gap-3">
                            <Heading.Root className="text-[16px] font-semibold">
                                <Heading.Content content="#01Pedido" />
                            </Heading.Root>
                            <Text.Root className="mt-1">
                                <Text.Content content="Nome do produto comprado" />
                            </Text.Root>
                            <Text.Root className="mt-1">
                                <Text.Content content="Quant: 2" />
                            </Text.Root>
                        </div>

                    </div>

                    <div>

                        <Text.Root className="mt-1 font-medium text-purple-solid-500">
                            <Text.Content content="R$ 350,00" />
                        </Text.Root>

                    </div>

                </div>


            </div>

    )
}