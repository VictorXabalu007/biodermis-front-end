import { SelectLabel } from "../../shared/Input/select-label";


export const PaymentStatus = {
    PAID: 'realizado',
    PENDING: 'pendente',
} as const;

export type PaymentStatusType = keyof typeof PaymentStatus;

export const withdrawalSelectOptions = [
    {
        value: '',
        label: <SelectLabel onBold="Filtrar por Status:" afterBold="Todos" />
    },
    {
        value: PaymentStatus.PENDING,
        label: <SelectLabel onBold="Filtrar por Status:" afterBold="Pendente" />
    },
    {
        value: PaymentStatus.PAID,
        label: <SelectLabel onBold="Filtrar por Status:" afterBold="Pago" />
    },

]