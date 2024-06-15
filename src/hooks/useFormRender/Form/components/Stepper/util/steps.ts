



const FormSteps = {
    STEP_1: 'Step1',
    STEP_2: 'Step2',
    STEP_3: 'Step3',
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