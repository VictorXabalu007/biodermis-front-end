
import { FormProvider, useForm } from "react-hook-form";
import { Stepper } from "./components/Stepper"
import { UserData, userSchema } from "../../../../Register/RegisterConsultor/components/FormContainer";
import { FormType } from "../../../../../@types/FormType/FormType";
import { useFormRender } from "../../../hooks/useFormRender";
import { useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert } from "antd";


export const FormModal = ({isReadonly, table, row, data}:FormType<UserData>) => {


    const {CurrentForm,handleFormRender} = useFormRender();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    
    const methods = useForm<UserData>({
        defaultValues: {...data},
        resolver: zodResolver(userSchema),
        mode: 'all',
        criteriaMode: 'all'
    });

    const onSubmit = (data:UserData) => {

        if(Object.keys(methods.formState.errors).length > 0){
            
            setError(true);

         } else {
            

            setSuccess(true)
            setTimeout(() => {
                setSuccess(false); 
            }, 3000);

             
            //@ts-ignore
            table.options.meta?.updateData(row.index, data);

         }

        

    }

    const watchValue = useCallback(()=> {

        const unsubscribe = methods.watch((values) => {
      
            const hasValue = Object.values(values).some(value => value !== '');
         
            setSuccess(!hasValue);
        });
        return unsubscribe;
        
    },[])


    useEffect(() => {

        watchValue();
       
    }, [methods.watch, watchValue]);

    return (

            <FormProvider {...methods}>

                
            {success &&
                
                <Alert className="my-3" message="Dados alterados" type="success" />

            }

            {
                error &&

                <Alert className="my-3" message="Há algum erro nos dados" type="error" />
            }
                
                <div className="flex flex-col w-full">

                    <Stepper 
                        handleFormRender={handleFormRender}
                    />
                    

                    <CurrentForm 
                        data={data} 
                        isReadonly={isReadonly}
                        table={table}
                        row={row}
                        onSubmit={onSubmit}
                        
                     />
                    
                </div>

            </FormProvider>

    );

}