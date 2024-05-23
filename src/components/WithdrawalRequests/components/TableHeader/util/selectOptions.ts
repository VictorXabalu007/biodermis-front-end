

export const PaymentStatus = {
    PAID: 'pago',
    PENDING: 'efetuar',
} as const;

export type PaymentStatusType = keyof typeof PaymentStatus;

export const withdrawalSelectOptions = [
    {
        value: '',
        label: 'Filtrar por Status: Todos'
    },
    {
        value: 'PENDING',
        label: 'Filtrar por Status: Efetuar'
    },
    {
        value: 'PAID',
        label: 'Filtrar por Status: Pago'
    },

]