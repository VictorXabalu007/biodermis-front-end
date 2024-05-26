import { UserRole } from "../../../../../util/UserRole";




export const userSelectOptions = [
    {
        value: '',
        label: 'Tipo: Todos'
    },
    {
        value: UserRole.ADMIN,
        label: 'Tipo: Admin'
    },
    {
        value: UserRole.CONSULTOR,
        label: 'Tipo: Consultor'
    },
    {
        value: UserRole.STOCK,
        label: 'Tipo: Estoque'
    },
    {
        value: UserRole.MANAGER,
        label: 'Tipo: Gerente'
    },
]