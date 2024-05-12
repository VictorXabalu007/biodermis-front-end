
import { Stepper } from "./components/Stepper"
import { useFormRender } from "./hooks/useFormRender"


export const FormModal = () => {


    const {currentForm,handleFormRender} = useFormRender();
    
    return (



            <div className="flex flex-col w-full">

                <Stepper 
                handleFormRender={handleFormRender}
                />

                {currentForm}
                
            </div>


    )
}