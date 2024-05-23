
export const UserStatusType = {
    ENABLE: 'ENABLE',
    DISABLE: 'DISABLE',
    ON_APPROVAL: 'ON_APPROVAL',
    ALL: ''
} as const

export type UserStatus = keyof typeof UserStatusType;
