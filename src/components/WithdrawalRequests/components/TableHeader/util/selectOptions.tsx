import { SelectLabel } from "../../../../shared/Input/Select/SelectLabel";


export const PaymentStatus = {
    PAID: 'aprovado',
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