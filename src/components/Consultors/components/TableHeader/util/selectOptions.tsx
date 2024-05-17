import { ConsultorStatusType } from "../../CTable/util/@types/StatusType";




export const userStatusOptions = [
    {
        value: ConsultorStatusType.ALL,
        label: 'Status: Todos'
    },
    {
        value: ConsultorStatusType.ENABLE,
        label: 'Status: Ativo'
    },
    {
        value: ConsultorStatusType.DISABLE,
        label: 'Status: Inativo'
    },
    {
        value: ConsultorStatusType.ON_APPROVAL,
        label: 'Status: Em aprovação'
    },
]