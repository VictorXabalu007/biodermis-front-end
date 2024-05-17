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
        
        actions: <></>,
        requests: 'Pedido 1',
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

        actions: <></>,
        requests: 'Pedido 2',
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


];


