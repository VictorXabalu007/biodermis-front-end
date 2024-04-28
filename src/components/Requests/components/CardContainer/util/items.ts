import { BRAND_PURPLE, GREEN_800, YEALLOW_700 } from "../../../../../constants/classnames/classnames";



export const items = [

    {
        cardColor : 'border border-purple-solid-600 bg-purple-solid-600/25',
        percent: 100,
        title: 'R$ 10.000',
        subText: 'Total de pagamentos',
        strokeColor: 
        {'0%': BRAND_PURPLE,
        '50%': BRAND_PURPLE,
        '100%': BRAND_PURPLE}
    },
    {
        cardColor : 'border border-green-solid-800 bg-green-solid-800/25',
        percent: 50,
        title: 'R$ 5.000',
        subText: 'Pagamentos aprovados',
        strokeColor: 
        {'0%': GREEN_800,
        '50%': GREEN_800,
        '100%': GREEN_800}
    },
    {
        cardColor : 'border border-yeallow-solid-700 bg-yeallow-solid-400/25',
        percent: 50,
        title: 'R$ 5.000',
        subText: 'Aguardando pagamento',
        strokeColor: 
        {'0%': YEALLOW_700,
        '50%': YEALLOW_700,
        '100%': YEALLOW_700}
    },




]