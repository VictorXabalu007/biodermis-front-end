


export const UserRole = {
    ADMIN: 'admin',
    MANAGER: 'manager',
    CONSULTOR: 'consultor',
    STOCK: 'stock',
} as const

export type UserRoleType = keyof typeof UserRole;

export const getUser = (userRole: string | undefined) => {

    switch(userRole){
        case 'admin':
            return 'Administrador'
        case 'manager':
            return 'Gerente'
        case 'consultor': 
            return 'Consultor'
        case 'stock':
            return 'Estoque'
    }

}



