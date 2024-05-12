


export const UserRole = {
    ADMIN: 'admin',
    MANAGER: 'manager',
    CONSULTOR: 'consultor',
    STOCK: 'stock',
} as const

export type UserRoleType = keyof typeof UserRole;

