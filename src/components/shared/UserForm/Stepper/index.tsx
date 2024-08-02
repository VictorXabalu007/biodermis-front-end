import { Steps } from "antd";
import { useState } from "react";
import { steps } from "./util/steps";
import * as C from './styles'
import { UserEditSteps } from "../../../../validations/updateUserValidation";


type StepperProps = {
    setFormType: (formType:UserEditSteps) => void
}

export const Stepper = ({setFormType}:StepperProps) => {

    const [current, setCurrent] = useState(0);
  
    const onChange = (value: number) => {

        setCurrent(value);
        
    };

    const getKey = (key:number) => {

        switch(key){
            case 0:
                return UserEditSteps.PersonalData
            case 1:
                return UserEditSteps.AddressData
            case 2:
                return UserEditSteps.BankData
            default:
                return UserEditSteps.PersonalData
        }
    }

    return (

        <C.Wrapper>

                <Steps 
                current={current} 
                type="navigation"
                onChange={onChange}
                className="site-navigation-steps w-full">

                {steps.map((step, index) => (

                    <Steps.Step
                    key={index} 
                    title={step.title}
                    icon={null}
                    onClick={() => setFormType(getKey(step.key))}
                    
                    />

                ))}

                </Steps>

        </C.Wrapper>

    );

}