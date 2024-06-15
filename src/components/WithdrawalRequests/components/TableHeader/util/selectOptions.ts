

export const PaymentStatus = {
    PAID: 'realizado',
    PENDING: 'pendente',
} as const;

export type PaymentStatusType = keyof typeof PaymentStatus;

export const withdrawalSelectOptions = [
    {
        value: '',
        label: 'Filtrar por Status: Todos'
    },
    {
        value: PaymentStatus.PENDING,
        label: 'Filtrar por Status: Pendente'
    },
    {
        value: PaymentStatus.PAID,
        label: 'Filtrar por Status: Pago'
    },

]