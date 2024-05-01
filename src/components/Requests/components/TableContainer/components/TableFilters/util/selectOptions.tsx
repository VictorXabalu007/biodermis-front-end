import { IoCalendarNumberOutline } from "react-icons/io5";



export const selectOptions = [

    {
       options: [
        {
            value: '90days',
            label: 'Últimos 90 dias'
        },
        {
            value: '45days',
            label: 'Últimos 45 dias'
        },
        {
            value: '20days',
            label: 'Últimos 20 dias'
        },
        {
            value: '10days',
            label: 'Últimos 10 dias'
        },
       ],
       defaultValue: 'Últimos 90 dias',
       icon: <IoCalendarNumberOutline className="fill-gray-400 text-xl" />
    },
    {
       options: [
        {
            value: 'requestsCurrent',
            label: 'Pedidos: Em andamento'
        },
        {
            value: 'requestsPending',
            label: 'Pedidos: Pendentes'
        },
        {
            value: 'requestsFinished',
            label: 'Pedidos: Finalizados'
        },

       ],

       defaultValue: 'Pedidos: Em andamento',

    },
    {
       options: [
        {
            value: 'statusAll',
            label: 'Status: Todos'
        },


       ],

       defaultValue: 'Status: Todos',

    },
    {
       options: [
        {
            value: 'sellChannelAll',
            label: 'Canal de venda: Todos'
        },


       ],

       defaultValue: 'Canal de venda: Todos',

    },

]