import { IoCalendarNumberOutline } from "react-icons/io5";
import { KeyType } from "../@types/KeyType";
import { Options } from "../../../../../../../@types/Options/Options";



type SelectOptions = {

    options: Options[],
    defaultValue: string,
    icon?: React.ReactNode,
    key: KeyType;

}

export const selectOptions:SelectOptions[] = [

    {
       options: [
        {
            value: 'last90Days',
            label: 'Últimos 90 dias'
        },
        {
            value: 'last45Days',
            label: 'Últimos 45 dias'
        },
        {
            value: 'last20Days',
            label: 'Últimos 20 dias'
        },
        {
            value: 'last10Days',
            label: 'Últimos 10 dias'
        },
       ],
       defaultValue: 'Últimos 90 dias',
       icon: <IoCalendarNumberOutline className="fill-gray-400 text-xl" />,
       key: 'latestDays',
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
       key: 'requests'
    },
    {
       options: [
        {
            value: 'statusAll',
            label: 'Status: Todos'
        },


       ],

       defaultValue: 'Status: Todos',
       key: 'status'

    },

    {
       options: [
        {
            value: 'sellChannelAll',
            label: 'Canal de venda: Todos'
        },


       ],

       defaultValue: 'Canal de venda: Todos',
       key: 'sellChannel'

    },

]