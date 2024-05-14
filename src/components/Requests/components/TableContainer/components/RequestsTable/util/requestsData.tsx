import { ReactNode } from "react";
import { PaymentStatus } from "./@types/PaymentStatus";
import { DeliveryStatys } from "./@types/DeliveryStatus";
import { SellOrSupply } from "./@types/SellOrSupply";
import { PaymentType } from "./@types/PaymentType";



export type TotalValue = {
    value:number;
    paymentType: PaymentType;
}

export type Requests = {

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

export const requestData : Requests[] = [

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


