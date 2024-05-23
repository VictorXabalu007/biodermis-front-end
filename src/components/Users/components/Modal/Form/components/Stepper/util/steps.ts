



const FormSteps = {
    STEP_1: 'Step1',
    STEP_2: 'Step2',
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

]