



const FormSteps = {
    STEP_1: 0,
    STEP_2: 1,
    STEP_3: 2,
} as const;

export const steps = [

    {
        title: 'Dados pessoais',
        key: FormSteps.STEP_1
    },
    {
        title: 'Endereço',
        key: FormSteps.STEP_2
    },
    {
        title: 'Dados bancários',
        key: FormSteps.STEP_3
        
    },

]