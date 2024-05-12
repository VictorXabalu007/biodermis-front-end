import { FormStep1 } from "../components/Step1"
import { FormStep2 } from "../components/Step2"
import { FormStep3 } from "../components/Step3"



export const render = (key:string) => {

    switch(key) {
        case '1':
            return <FormStep1 />
        case '2':
            return <FormStep2 />
        case '3':
            return <FormStep3 />
    }

}