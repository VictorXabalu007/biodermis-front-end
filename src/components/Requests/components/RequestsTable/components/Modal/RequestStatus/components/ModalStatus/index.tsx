
import { Text } from "../../../../../../../../shared/Text"
import { buildPaymentStatus } from "../../../../../../functions/buildPaymentStatus"
import { buildDeliveryStatus } from "../../../../../../functions/buildDeliveryStatus"
import { Requests } from "../../../../../../@types/Requests"
import { NumericFormatter } from "../../../../../../../../shared/Formatter/NumericFormatter"
import { Typography } from "antd"
import { IoCopyOutline } from "react-icons/io5"
import { FaCheck } from "react-icons/fa6"
import { useUserData } from "../../../../../../../../../hooks/useUserData/useUserData"




const { Paragraph } = Typography;


export const ModalStatus = ({requests}:{requests:Requests}) => {

    const {getUserNameById} = useUserData();

    const data = [
        {
            title: 'Data de pagamento',
            label: requests.datapedido
        },
        {
            title: 'Nome comprador:',
            label: getUserNameById(requests.cliente_id)
        },
        {
            title: 'Status do pagamento:',
            label: buildPaymentStatus(requests.statuspag)
        },
        {
            title: 'Status de entrega',
            label: (
            
            <div className="flex justify-start w-full gap-2">
                
                <div>
                    {buildDeliveryStatus(requests.statusentrega, requests.id)}   
                </div>
    
                <div className="flex text-start w-full justfy-start items-center gap-2">
    

                <Paragraph
                    className="flex text-[12px] items-center text-brand-purple"
                    copyable={{
                        icon: [
                        <IoCopyOutline className="text-brand-purple"
                        key={"copy-icon"}
                        />,
                        
                        <FaCheck key="copied-icon" />],
                        tooltips: ['Copiar', 'Código copiada'],
                        text: '12121212',
                        
                    }}
                    >

                    Copiar Código de rastreio
                </Paragraph>
           
                </div>
    
            </div>
    
            )
        },
        {
            title: 'compras/venda',
            label: requests.modelo
        },
        {
            title: 'Valor do frete',
            label: requests.valorfrete
        },
        {
            title: 'Preço total do pedido:',
            label: requests.valor
        },
        {
            title: 'Forma de pagamento:',
            label: requests.formapag_id
        },
        {
            title: 'Forma de envio',
            label: 'SEDEX Até 7 dias úteis'
        },
    ]

    return (


        <div className="flex gap-2 mt-10 flex-col">


            {data.map(item => {
                return (

                <div key={item.title} className="flex flex-col gap-12">

                    <div className="flex gap-2">

                        <Text.Root>
                            <Text.Content content={item.title} />
                        </Text.Root>

                        <div className="text-black font-[400]">
                            
                        {Number(item.label) ? 
                            (   
                                //@ts-ignore
                                <NumericFormatter value={parseFloat(item.label)} />
                            ) :
                            <>
                                   {item.label}
                            </>
                        
                        }
                        </div>

                    </div>

                    <hr className="my-2"/>

                </div>

                );
            })}

        </div>


    )

}