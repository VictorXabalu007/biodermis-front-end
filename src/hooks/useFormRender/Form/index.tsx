
import { FormProvider, useForm } from "react-hook-form";

import { Stepper } from "./components/Stepper"

import { zodResolver } from "@hookform/resolvers/zod";

import { useCallback, useEffect, useState } from "react";
import { Alert } from "antd";
import { viewUserSchema } from "../../../components/Register/RegisterConsultor/components/FormContainer";
import { useFormRender } from "../useFormRender";
import { FormType } from "../../../@types/FormType/FormType";
import { UserCredentials } from "../../../@types/UserData/UserData";
import {  useMutation } from "@tanstack/react-query";
import { updateUser } from "../../../service/updateUser";


export const FormModal = ({isReadonly, row, table, data}:FormType<UserCredentials>) => {


    const {CurrentForm,handleFormRender} = useFormRender();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    
    
    const methods = useForm<any>({
        defaultValues: {...data},
        resolver: zodResolver(viewUserSchema),
        mode: 'all',
        criteriaMode: 'all'
    });
    
    const updateUserMutation = useMutation({
        mutationFn: (data:UserCredentials) => updateUser(data, row.original.id),
        onSuccess: (res, context:UserCredentials) => {

            
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false); 
            }, 3000);

            console.log(res);
   
            //@ts-ignore
            table.options.meta?.updateData(row.index, context);
            

        },
        onError: (err) => {

            console.log(err);
            setError(true);
            
        }
        
    })

    const onSubmit = (data: UserCredentials) => {


        
        updateUserMutation.mutate(data);
          
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
                        onSubmit={onSubmit}
                        data={data} 
                        row={row} 
                        table={table} 
                        isReadonly={isReadonly}
                     />
                    
                </div>

            </FormProvider>





    );

}