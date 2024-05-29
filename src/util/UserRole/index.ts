


export const UserRole = {
    ADMIN: 0,
    MANAGER: 1,
    CONSULTOR: 2,
    STOCK: 3,
    USER: 4,
} as const

export type UserRoleType = keyof typeof UserRole;

export const getUser = (userRole: number | undefined) => {

    switch(userRole){
        case 0:
            return 'Administrador'
        case 1:
            return 'Gerente'
        case 2: 
            return 'Consultor'
        case 3:
            return 'Estoque'
        case 4:
            return 'Cliente'
    }

}



