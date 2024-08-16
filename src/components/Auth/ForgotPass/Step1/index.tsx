
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { Alert, Button, Flex, Form, Input, Typography } from 'antd';
import { useMutation } from "@tanstack/react-query";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import forgotBg from '../../../../assets/purple-frame-forgotpass.png'
import biodermisLogo from '../../../../assets/small-logo.png';
import { api } from "../../../../service/connection";
import { useState } from "react";
import { FORGOT_PASS_2 } from "../../../../constants/paths/paths";
import { MAIN_FORGOT_PASS } from "../../../../constants/SessionStorageKeys/sessionStorageKeys";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Text } from "../../../shared/Typography/typography-text";



type ForgotPassType = {
    email: string;
    password: string;
};

export const ForgotPassStep1 = () => {

    const [authError, setAuthError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    

    const step1ForgotPassSchema = z.object({
        email: z.string({required_error: 'O e-mail é necessário para recuperar sua senha'})
        .min(1,'E-mail é necessário para recuperar sua senha')
        .email('Isto não é um email!'),
    })

    const {handleSubmit, control, formState:{errors}} = useForm<ForgotPassType>({
        resolver: zodResolver(step1ForgotPassSchema),
        mode: 'all',
        criteriaMode: 'all'
    });
    
    const navigate = useNavigate();
    
    const mutation = useMutation({
        mutationFn: async (data:ForgotPassType)=> {
            

            const body = {
                email: data.email,
            }

            const request = await api.post('/esqueceu_senha',body);

          
            return request.data;

        },

        onSuccess:(_,context)=>{

            sessionStorage.setItem(MAIN_FORGOT_PASS, JSON.stringify(context))

            setIsLoading(false);
            navigate(FORGOT_PASS_2);

          },

        onError:(err:any)=>{
            setAuthError(err.response?.data?.error || 'Erro ao realizar');
            setIsLoading(false);
        }
    });

    

    const onSubmit = (data:ForgotPassType) => {

       mutation.mutate(data);
       setIsLoading(true);
      
    }


    const [form] = Form.useForm();
    

    return (

        <div className="flex gap-3 items-center w-full min-h-screen">

                
            <img  
                src={forgotBg}
                alt="Imagem de esqueceu a senha"
                className="w-1/2 min-h-screen md:flex hidden"
                style={{
                    objectFit: 'cover'
                }}
            />
   

            <Flex 
            vertical
            justify="center" 
            className="mx-auto w-full px-4 md:w-1/3">

                <div className="flex items-start flex-col gap-4 mb-3">

                    <Button className="px-1" onClick={() => navigate(-1)} type="text">
                        <Flex align="center" gap={10}>

                            <FaArrowLeftLong className="text-brand-purple" />
                            <p className="text-gray-neutral-300">
                                Voltar
                            </p>
                        </Flex>
                    </Button>
                    <img 
                        src={biodermisLogo}
                        alt="Logo da biodermis"
                        className="w-1/3 mb-3"
                    />


                    <Typography.Title level={4}>
                    Esqueceu sua senha?
                    </Typography.Title>

                    <Text>
                 
                     Insira os dados para recuperar sua senha
                        

                    </Text>

                    <Text>
                   
                        Introduza o endereço de e-mail que utilizou quando aderiu e iremos enviar as instruções para repor a sua palavra-passe.
                   
                    </Text>

                </div>

                <Form
                
                form={form}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={handleSubmit(onSubmit)}
                autoComplete="off"
                >

                {authError && (
                    <Alert
                        message={authError}
                        type="error"
                        showIcon
                        className="mb-3"
                    />
                )}

                <Flex vertical gap={10}>


                    <Controller
                    
                    control={control}
                    name="email"
                    render={({field})=> (

                        <Form.Item
                        name="email"
                        validateStatus={errors.email ? 'error' : 'success'}
                        help={errors.email && errors.email.message}
                        >

              
                            
                                <Input
                               
                                {...field}
                                type="email"
                                placeholder="email"
                                /> 
                            
                 

                                
                        </Form.Item>
                
                    )}
                    
                    />
                    
                
        

                     

                            <Button 
                            loading={isLoading}
                            size="large"
                            className="w-full " 
                            htmlType="submit">

                                Continuar

                            </Button>

               


                


                </Flex>

            </Form>


            </Flex>

        </div>


    )


}