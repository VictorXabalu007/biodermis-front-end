import { SelectLabel } from "../../../../shared/Input/Select/SelectLabel";

const DeliveryStatus = {

    DELIVERY_STATUS_ALL : '',
    DELIVERY_STATUS_IN_PROGRESS : 'em andamento',
    DELIVERY_STATUS_RECEIVED : 'realizada',

} as const;


export const deliveryOptions = [

        {
            value: DeliveryStatus.DELIVERY_STATUS_ALL,
            label:  <SelectLabel onBold="Pedidos: " afterBold="Todos" />,
        },
        {
            value: DeliveryStatus.DELIVERY_STATUS_IN_PROGRESS,
            label:  <SelectLabel onBold="Pedidos: " afterBold="Em andamento" />,
        },
        {
            value: DeliveryStatus.DELIVERY_STATUS_RECEIVED,
            label:  <SelectLabel onBold="Pedidos: " afterBold="Realizados" />,
        },

];

export const daysOptions = [

        {
            value: '90',
            label: <SelectLabel onBold="Ultimos: " afterBold="90 dias" />,

        },
        {
            value: '45',
            label: <SelectLabel onBold="Ultimos: " afterBold="45 dias" />,
     
        },
        {
            value: '20',
            label:  <SelectLabel onBold="Ultimos: " afterBold="20 dias" />,

        },
        {
            value: '10',
            label:  <SelectLabel onBold="Ultimos: " afterBold="10 dias" />,

        },
        {
            value: '5',
            label:  <SelectLabel onBold="Ultimos: " afterBold="5 dias" />,

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
        label: <SelectLabel onBold="Status pag: " afterBold="Todos" />,

    },
    {
        value: StatusType.STATUS_DONE,
        label: <SelectLabel onBold="Status pag: " afterBold="Realizado" />,

    },
    {
        value: StatusType.STATUS_PENDING,
        label: <SelectLabel onBold="Status pag: " afterBold="Aguardando" />,

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
            label: <SelectLabel onBold="Canal de vendas: " afterBold="Todos" />
        },
        {
            value: SellChannelType.SELL_CHANNEL_PIX,
            label: <SelectLabel onBold="Canal de vendas: " afterBold="Pix" />
        },
        {
            value: SellChannelType.SELL_CHANNEL_CREDITO,
            label: <SelectLabel onBold="Canal de vendas: " afterBold="Crédito" />
        },
        {
            value: SellChannelType.SELL_CHANNEL_DEBITO,
            label: <SelectLabel onBold="Canal de vendas: " afterBold="Débito" />
        },
        {
            value: SellChannelType.SELL_CHANNEL_BOLETO,
            label: <SelectLabel onBold="Canal de vendas: " afterBold="Boleto" />
        },

];
