


export const UserRole = {
    ADMIN: 1,
    MANAGER: 2,
    STOCK: 3,
    CONSULTOR: 4,
    USER: 5,
} as const

export type UserRoleType = keyof typeof UserRole;

export const getUserRole = (userRole: number | string | undefined) => {

    switch(userRole){
        case 1:
            return 'Administrador'
        case 2:
            return 'Gerente'
        case 3: 
            return 'Estoque'
        case 4:
            return 'Consultor'
        case 5:
            return 'Cliente'
    }

}



