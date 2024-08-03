
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { Button } from "../../../../shared/Button";
import { AddressDataForm } from "./components/AddressDataForm";
import { BankDataForm } from "./components/BankDataForm";
import { Uploader } from "./components/Uploader";
import { Checkboxes } from "./components/Checkboxes";
import { useEffect, useState } from "react";
import { UserRole } from "../../../../../util/UserRole";
import { Form  } from "antd";
import { PessoalDataForm } from "./components/PessoalDataForm";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../../../service/connection";
import { useMessageAction } from "../../../../../hooks/useMessageAction/useMessageAction";
import { getHeaders } from "../../../../../service/getHeaders";
import { getTypeOfPixKey } from "../../../../../functions/Getters/getTypeOfPixKey";
import { UserData, userSchema } from "../../../../../validations/registerUserValidation";

export const FormContainer = () => {

    const {success,error, contextHolder} = useMessageAction();

    const [isConsultor, setIsConsultor] = useState(false);

    const {
        register,
        handleSubmit,
        formState:{errors},
        reset, 
        control,
        watch} = useForm<UserData>({
        
        resolver: zodResolver(userSchema),
        criteriaMode: 'all',
        mode: 'all',
        defaultValues: {
            cargo_id: UserRole.ADMIN,
            certificado: undefined
        }

    });


    const userRole = watch('cargo_id');


    useEffect(()=> {

        if(userRole === UserRole.CONSULTOR){
            setIsConsultor(true)
        } else {
            setIsConsultor(false)
        }
        
    },[watch,isConsultor,userRole]);

    
    const postAddress = useMutation({
        mutationFn: async ({data,id}:{data:UserData,id:number}) => {
            
            const body = {
                "rua": data.rua,
                "bairro": data.bairro,
                "estado":data.estado,
                "cep": data.cep,
                "cidade": data.cidade,
                "usuario_id":id,
                "numero":data.numero,
                "complemento":data.complemento
            }

            const headers = getHeaders();
          
            const req = await api.post(`/endereco`,body, {
                headers
            })

            return req.data

            
        },
        onSuccess: (res) => {
            
            success(res.success);
            onReset();
        },
        onError: (err:any)=> {
            console.log(err);
            
            error(err.response.data.error)
        }
    })

    const postUser = useMutation({

        mutationFn: async (data: UserData) => {

            const headers = getHeaders();
          
            const body = {

                "nome": data.nome,
                "cpf": data.cpf,
                "email": data.email,
                "telefone": data.telefone,
                "agencia": data.bankData.agencia,
                "conta": data.bankData.conta,
                "pix": data.bankData.pix,
                "senha": data.senha,
                "cargo_id": data.cargo_id,
                "banco":data.bankData.banco,
                "tipochave": getTypeOfPixKey(data.bankData.pix)
            }


            const req = await api.post('/usuarios',body,{
                headers,
            });
            
            return req.data;

          },

          onSuccess: (res,context) => {

            console.log(res);
            postAddress.mutate({data:context,id:res.id});

          },

        onError: (err: any) => {
            
            error(err.response.data.error);

        }

    });

    const onSubmit = (data: UserData) => {

        postUser.mutate(data);

    }

    const [form] = Form.useForm();

    const onReset = () => {

        form.resetFields();
        reset({cargo_id: UserRole.ADMIN});
        
 
    };

    return (

        <div className="max-w-2xl">
            {contextHolder}

            <Form
                form={form}
                onFinish={handleSubmit(onSubmit)}
            >
                
                <PessoalDataForm 
                errors={errors}
                control={control}
                />

                <AddressDataForm 
                 errors={errors}
                 register={register}
                 control={control}

                />

        
                   <BankDataForm 
                   errors={errors}
                   register={register}
                   control={control}
                  />
     
             

          
                <Checkboxes
                errors={errors}
                register={register}
                control={control}
                />
                


                {isConsultor &&
                    <Uploader 
                    control={control}
                    errors={errors}
                    register={register}
                    />
                }    


                <div className="flex gap-2 mt-10">

                    <Button.Root htmlType="submit" aria-label="submit fields" className="w-1/3">

                        <Button.Wrapper>
                            <Button.Content 
                                content="Enviar"
                                />
                        </Button.Wrapper>

                    </Button.Root>

                    <Button.Root 
                    aria-label="reset fields"
                    className="w-1/3 bg-gray-neutral-200 hover:bg-gray-neutral-400 text-gray-neutral-950"
                    htmlType="reset"
                    onClick={onReset}
                    >
                        
                        <Button.Wrapper>

                            <Button.Content 
                                content="cancelar"
                                />

                        </Button.Wrapper>
                        
                    </Button.Root>

                </div>

            </Form>

            </div>


    );
}