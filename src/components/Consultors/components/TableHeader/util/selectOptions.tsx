import { UserStatusType } from "../../../../../@types/UserStatus/StatusType";



export const userStatusOptions = [
    {
        value: UserStatusType.ALL,
        label: 'Status: Todos'
    },
    {
        value: UserStatusType.ENABLE,
        label: 'Status: Ativo'
    },
    {
        value: UserStatusType.DISABLE,
        label: 'Status: Inativo'
    },
    {
        value: UserStatusType.ON_APPROVAL,
        label: 'Status: Em aprovação'
    },
]