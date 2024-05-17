
const DeliveryStatus = {

    DELIVERY_STATUS_ALL : '',
    DELIVERY_STATUS_IN_PROGRESS : 'Em andamento',
    DELIVERY_STATUS_RECEIVED : 'Recebido',

} as const;


export const deliveryOptions = [

        {
            value: DeliveryStatus.DELIVERY_STATUS_ALL,
            label: 'Pedidos: Todos'
        },
        {
            value: DeliveryStatus.DELIVERY_STATUS_IN_PROGRESS,
            label: 'Pedidos: Em andamento'
        },
        {
            value: DeliveryStatus.DELIVERY_STATUS_RECEIVED,
            label: 'Pedidos: Recebido'
        },

];

export const daysOptions = [

        {
            value: '90',
            label: 'ultimos 90 dias',

        },
        {
            value: '45',
            label: 'ultimos 45 dias',
     
        },
        {
            value: '20',
            label: 'ultimos 20 dias',

        },
  
];


const StatusType = {
    STATUS_ALL: 'All',
} as const;

export const statusOptions = [

    {
        value: StatusType.STATUS_ALL,
        label: 'Status: Todos',

    },
]

const SellChannelType = {
    SELL_CHANNEL_ALL : 'All'
}

export const sellChannelOptions = [
        {
            value: SellChannelType.SELL_CHANNEL_ALL,
            label: 'Canal de vendas: Todos'
        },
]
