import { useState } from "react"
import { FormStep1 } from "../components/Modal/Form/components/Step1"
import { FormStep2 } from "../components/Modal/Form/components/Step2";
import { FormStep3 } from "../components/Modal/Form/components/Step3";



export const useFormRender = () => {

    const steps = [
        { component: FormStep1, key: "Step1" },
        { component: FormStep2, key: "Step2" },
        { component: FormStep3, key: "Step3" },
    ];


    const [currentStep, setCurrentStep] = useState(0);

    const handleFormRender = (key: string) => {
        const stepIndex = steps.findIndex((step) => step.key === key);
        if (stepIndex !== -1) {
            setCurrentStep(stepIndex);
        }
    };

    const CurrentForm = steps[currentStep].component;

    return {
        CurrentForm,
        handleFormRender
    }


}