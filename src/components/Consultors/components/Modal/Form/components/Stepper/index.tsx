import { Steps } from "antd";
import { useState } from "react";
import { steps } from "./util/steps";
import * as C from './styles'


type StepperProps = {
    handleFormRender: (key:string)=> void
}

export const Stepper = ({handleFormRender}:StepperProps) => {

    const [current, setCurrent] = useState(0);
  
    const onChange = (value: number) => {

        setCurrent(value);
        

    };

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
                    onClick={() => handleFormRender(step.key)}
                    
                    />

                ))}

                </Steps>

        </C.Wrapper>

    );

}