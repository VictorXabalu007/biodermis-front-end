


export const ConsultorStatusType = {
    ENABLE: 'ENABLE',
    DISABLE: 'DISABLE',
    ON_APPROVAL: 'ON_APPROVAL',
    ALL: ''
} as const

export type ConsultorStatus = keyof typeof ConsultorStatusType;
