import { GoCopy } from "react-icons/go"
import { Text } from "../../../../../../../../../../shared/Text"
import { buildDeliveryStatus } from "../../../../../util/functions/buildDeliveryStatus"
import { buildPaymentStatus } from "../../../../../util/functions/buildPaymentStatus"



const data = [
    {
        title: 'Data de pagameto',
        label: '01/01/2024'
    },
    {
        title: 'Nome comprador:',
        label: 'João Victor da Silva'
    },
    {
        title: 'Status do pagamento:',
        label: buildPaymentStatus('Aprovado')
    },
    {
        title: 'Status de entrega',
        label: (
        
        <div className="flex justify-between w-full gap-2">

            {buildDeliveryStatus('Em andamento') }

            <div className="flex items-center gap-2">

                <Text.Root className="text-brand-purple font-medium">
                    <Text.Content content="Copiar código de rastreio" />
                </Text.Root>
                <GoCopy className="fill-brand-purple"/>

            </div>

        </div>

        )
    },
    {
        title: 'Abastecimento/venda',
        label: 'Venda'
    },
    {
        title: 'Valor do frete',
        label: 'R$20,00'
    },
    {
        title: 'Preço total do pedido:',
        label: '150'
    },
    {
        title: 'Forma de pagamento:',
        label: 'Cartão de credito Visa 12X'
    },
    {
        title: 'Forma de envio',
        label: 'SEDEX Até 7 dias úteis'
    },
]


export const ModalStatus = () => {

    return (


        <div className="flex gap-2 mt-10 flex-col">


            {data.map(item => {
                return (

                <div className="flex flex-col gap-12">

                    <div className="flex gap-2">

                        <Text.Root>
                            <Text.Content content={item.title} />
                        </Text.Root>

                        <div className="text-black font-[400]">
                            {item.label}
                        </div>

                    </div>

                    <hr className="my-2"/>

                </div>

                )
            })}

        </div>


    )

}