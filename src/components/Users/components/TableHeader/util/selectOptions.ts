

export const UserTypeRole = {
    USER: 'Usuário',
    CONSULTOR: 'Consultor',
    ALL: ''
} as const;

export const userSelectOptions = [
    {
        value: UserTypeRole.ALL,
        label: 'Tipo: Todos'
    },
    {
        value: UserTypeRole.USER,
        label: 'Tipo: Usuário'
    },
    {
        value: UserTypeRole.CONSULTOR,
        label: 'Tipo: Consultor'
    },
]