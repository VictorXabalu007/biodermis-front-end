import { ReactNode, useState } from "react"
import { FormStep1 } from "../components/Step1"
import { render } from "../functions/render";


export const useFormRender = () => {

    const [currentForm, setCurrentForm] = useState<ReactNode>(<FormStep1 />);

    const handleFormRender = (key:string) => {

        setCurrentForm(render(key))

    }

    return {
        currentForm,
        handleFormRender
    }


}