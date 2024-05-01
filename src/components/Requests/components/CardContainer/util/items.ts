import { BRAND_PURPLE, GREEN_800, YEALLOW_700 } from "../../../../../constants/classnames/classnames";



export const items = [

    {      
        key: '1',
        percent: 100,
        title: 'R$ 10.000',
        subText: 'Total de pagamentos',
        strokeColor: 
        {'0%': BRAND_PURPLE,
        '50%': BRAND_PURPLE,
        '100%': BRAND_PURPLE}
    },
    {       
        key: '2',
        percent: 50,
        title: 'R$ 5.000',
        subText: 'Pagamentos aprovados',
        strokeColor: 
        {'0%': GREEN_800,
        '50%': GREEN_800,
        '100%': GREEN_800}
    },
    {      
        key: '3',
        percent: 50,
        title: 'R$ 5.000',
        subText: 'Aguardando pagamento',
        strokeColor: 
        {'0%': YEALLOW_700,
        '50%': YEALLOW_700,
        '100%': YEALLOW_700}
    },




]