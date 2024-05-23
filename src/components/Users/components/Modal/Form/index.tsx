
import { FormProvider, useForm } from "react-hook-form";
import { useFormRender } from "../../../hooks/useFormRender";
import { Stepper } from "./components/Stepper"
import { ConsultorsViewData } from "../../../../Register/RegisterConsultor/components/FormContainer";
import { FormType } from "../../@types/FormType";


export const FormModal = ({isReadonly, data}:FormType) => {


    const {CurrentForm,handleFormRender} = useFormRender();

    const initialData = {

        name: data.name,
        cpf: data.cpf,
        phone: data.phone, 
        email: data.email,
        address: data.address,
        cep: data.cep,
        number: data.number,
        street: data.street,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: data.city,
        cardNumber: data.cardNumber,
        cvv: data.cvv,
        expireDate: data.expireDate,
        cardName: data.titularName,
        bank: data.bank,
        agency: data.agency,
        pixkey: data.pix,

    };
    
    const methods = useForm<ConsultorsViewData>({
        defaultValues: initialData
    });

    return (

            <FormProvider {...methods}>
                
                <div className="flex flex-col w-full">

                    <Stepper 
                    handleFormRender={handleFormRender}
                    />
                    

                    <CurrentForm data={data} isReadonly={isReadonly} />
                    
                </div>

            </FormProvider>

    );

}