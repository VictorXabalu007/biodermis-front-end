import { ReactNode } from "react";
import { PaymentStatus } from "./@types/PaymentStatus";
import { DeliveryStatys } from "./@types/DeliveryStatus";
import { buildDeliveryStatus } from "./functions/buildDeliveryStatus";
import { buildPaymentStatus } from "./functions/buildPaymentStatus";
import { SellOrSupply } from "./@types/SellOrSupply";
import { FaWhatsapp } from "react-icons/fa6";
import { buildTotalValue } from "./functions/buildTotalValue";
import { PaymentType } from "./@types/PaymentType";
import { TableActions } from "../components/TableActions";
import { TableColumnsType } from "antd";
import { ArrowUpDownIcon } from "../../../../../../shared/Icon/ArrowUpDownIcon";



export type TotalValue = {
    value:number;
    paymentType: PaymentType;
}

export type DataType = {

    key: string,
    actions: ReactNode, //acções
    requests: string, //pedidos
    buyerName: string, //Nome comprador
    consultor: string, // consultora
    paymentStatus: PaymentStatus, // Status pagamento
    deliveryStatus: DeliveryStatys, // Status da entrega
    sellOrSupply: SellOrSupply, // Abastecimento/venda
    shippingValue: number, //valor frete
    totalValue: TotalValue, // valor total
    whatsaap: ReactNode

}

export const requestData : DataType[] = [

    {
        key: '1',
        actions: <></>,
        requests: '#999Pedido',
        buyerName: 'Gustavo Henrique',
        consultor: 'Biodermis',
        paymentStatus: 'Aprovado',
        deliveryStatus: 'Em andamento',
        sellOrSupply: 'Abastecimento',
        shippingValue: 20,
        totalValue: {value: 150, paymentType: 'Boleto'},
        whatsaap: <></>

    },
    {
        key: '2',
        actions: <></>,
        requests: '#999Pedido',
        buyerName: 'Gustavo Henrique',
        consultor: 'Biodermis',
        paymentStatus: 'Aguardando',
        deliveryStatus: 'Recebido',
        sellOrSupply: 'Venda',
        shippingValue: 20,
        totalValue: {value: 150, paymentType: 'Cartão de crédito'},
        whatsaap: <></>

    },
    {
        key: '3',
        actions: <></>,
        requests: '#999Pedido',
        buyerName: 'Gustavo Henrique',
        consultor: 'Biodermis',
        paymentStatus: 'Aguardando',
        deliveryStatus: 'Recebido',
        sellOrSupply: 'Abastecimento',
        shippingValue: 20,
        totalValue: {value: 150, paymentType: 'PIX'},
        whatsaap: <></>

    },
    {
        key: '4',
        actions: <></>,
        requests: '#999Pedido',
        buyerName: 'Gustavo Henrique',
        consultor: 'Biodermis',
        paymentStatus: 'Aprovado',
        deliveryStatus: 'Em andamento',
        sellOrSupply: 'Venda',
        shippingValue: 20,
        totalValue: {value: 150, paymentType: 'Boleto'},
        whatsaap: <></>

    },
    {
        key: '5',
        actions: <></>,
        requests: '#999Pedido',
        buyerName: 'Gustavo Henrique',
        consultor: 'Biodermis',
        paymentStatus: 'Aprovado',
        deliveryStatus: 'Recebido',
        sellOrSupply: 'Abastecimento',
        shippingValue:  20,
        totalValue: {value: 150, paymentType: 'Boleto'},
        whatsaap: <></>

    },
    {
        key: '6',
        actions: <></>,
        requests: '#999Pedido',
        buyerName: 'Gustavo Henrique',
        consultor: 'Biodermis',
        paymentStatus: 'Aguardando',
        deliveryStatus: 'Recebido',
        sellOrSupply: 'Venda',
        shippingValue: 20,
        totalValue: {value: 150, paymentType: 'PIX'},
        whatsaap: <></>

    },
    {
        key: '7',
        actions: <></>,
        requests: '#999Pedido',
        buyerName: 'Gustavo Henrique',
        consultor: 'Biodermis',
        paymentStatus: 'Aguardando',
        deliveryStatus: 'Recebido',
        sellOrSupply: 'Abastecimento',
        shippingValue: 20,
        totalValue: {value: 150, paymentType: 'Cartão de crédito'},
        whatsaap: <></>

    },
    {
        key: '8',
        actions: <></>,
        requests: '#999Pedido',
        buyerName: 'Gustavo Henrique',
        consultor: 'Biodermis',
        paymentStatus: 'Aguardando',
        deliveryStatus: 'Recebido',
        sellOrSupply: 'Abastecimento',
        shippingValue: 20,
        totalValue: {value: 150, paymentType: 'PIX'},
        whatsaap: <></>

    },
    {
        key: '9',
        actions: <></>,
        requests: '#999Pedido',
        buyerName: 'Gustavo Henrique',
        consultor: 'Biodermis',
        paymentStatus: 'Aprovado',
        deliveryStatus: 'Em andamento',
        sellOrSupply: 'Venda',
        shippingValue: 20,
        totalValue: {value: 150, paymentType: 'PIX'},
        whatsaap: <></>

    },
    {
        key: '10',
        actions: <></>,
        requests: '#999Pedido',
        buyerName: 'Gustavo Henrique',
        consultor: 'Biodermis',
        paymentStatus: 'Aprovado',
        deliveryStatus: 'Em andamento',
        sellOrSupply: 'Abastecimento',
        shippingValue: 20,
        totalValue: {value: 150, paymentType: 'Boleto'},
        whatsaap: <></>

    },

];



export const requestColumns: TableColumnsType<DataType> = [

    {
        title: <p>Ações</p>,
        key: 'actions',
        dataIndex: 'actions',
        render: () => {
        
            return (

                <TableActions />
               
            );
        }
    },
    {
        title: <div className={'flex gap-2'}>Pedidos <ArrowUpDownIcon /></div>,
        key: 'requests',
        dataIndex: 'requests',
        render: (request) => {
        
            return (

                <p>{request}</p>

            )
    
        },
        // onFilter: (value,request) => request.includes(value as string)
        
    },
    {
        title: <p>Nome comprador</p>,
        key: 'buyerName',
        dataIndex: 'buyerName',
        render: (name) => {
        
            return (

              <p>{name}</p>

            )
    
        }
    },
    {
        title: <p>Consultora</p>,
        key: 'consultor',
        dataIndex: 'consultor',
        render: (consultor) => {
        
            return (

              <p>{consultor}</p>

            )
    
        }
    },
    {
        title: <p>Status pagamento</p>,
        key: 'paymentStatus',
        dataIndex: 'paymentStatus',
        render: (status:PaymentStatus) => {
        
            return (
                buildPaymentStatus(status)
            )
    
        }
    },
    {
        title: <p>Status de entrega</p>,
        key: 'deliveryStatus',
        dataIndex: 'deliveryStatus',
        render: (status:DeliveryStatys) => {
        
            return (
                buildDeliveryStatus(status)
            )
    
        }
    },
    {
        title: <p >Abastecimento/Vendas</p>,
        key: 'sellOrSupply',
        dataIndex: 'sellOrSupply',
        render: (sellOrSupply:SellOrSupply) => {
        
            return (
                <p>{sellOrSupply}</p>
            )
    
        }
    },
    {
        title: <p >Valor frete</p>,
        key: 'shippingValue',
        dataIndex: 'shippingValue',
        render: (shippingValue) => {
        
            return (
               <p>{shippingValue}</p>
            )
    
        }
    },
    {
        title: <p >Valor total</p>,
        key: 'totalValue',
        dataIndex: 'totalValue',
        render: (total:TotalValue) => {
        
            return (
                buildTotalValue(total.value, total.paymentType)
            )
    
        }
    },
    {
        title: <p>WhatsApp</p>,
        key: 'whatsaap',
        dataIndex: 'whatsaap',
        render: () => {
        
            return (

               
                    <FaWhatsapp className="text-2xl mx-auto text-purple-solid-600 hover:text-purple-solid-600/50" />
          
            )
    
        }
    },


]