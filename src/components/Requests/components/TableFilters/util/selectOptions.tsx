
const DeliveryStatus = {

    DELIVERY_STATUS_ALL : '',
    DELIVERY_STATUS_IN_PROGRESS : 'em andamento',
    DELIVERY_STATUS_RECEIVED : 'realizada',

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
            label: 'Pedidos: Realizado'
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
        {
            value: '10',
            label: 'ultimos 10 dias',

        },
        {
            value: '5',
            label: 'ultimos 5 dias',

        },
  
];


const StatusType = {
    STATUS_ALL: '',
    STATUS_DONE: 'realizado',
    STATUS_PENDING: 'aguardando',
} as const;

export const statusOptions = [

    {
        value: StatusType.STATUS_ALL,
        label: 'Status Pag: Todos',

    },
    {
        value: StatusType.STATUS_DONE,
        label: 'Status Pag: Realizado',

    },
    {
        value: StatusType.STATUS_PENDING,
        label: 'Status Pag: aguardando',

    },
]

const SellChannelType = {
    SELL_CHANNEL_ALL : '',
    SELL_CHANNEL_PIX: '1',
    SELL_CHANNEL_CREDITO: '2',
    SELL_CHANNEL_DEBITO: '3',
    SELL_CHANNEL_BOLETO: '4',
} as const

export const sellChannelOptions = [

        {
            value: SellChannelType.SELL_CHANNEL_ALL,
            label: 'Canal de vendas: Todos'
        },
        {
            value: SellChannelType.SELL_CHANNEL_PIX,
            label: 'Canal de vendas: pix'
        },
        {
            value: SellChannelType.SELL_CHANNEL_CREDITO,
            label: 'Canal de vendas: crédito'
        },
        {
            value: SellChannelType.SELL_CHANNEL_DEBITO,
            label: 'Canal de vendas: debito'
        },
        {
            value: SellChannelType.SELL_CHANNEL_BOLETO,
            label: 'Canal de vendas: boleto'
        },

];
