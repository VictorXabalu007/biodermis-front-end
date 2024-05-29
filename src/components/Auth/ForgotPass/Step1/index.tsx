
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { Alert, Button, Flex, Form, Input } from 'antd';
import { useMutation } from "@tanstack/react-query";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import forgotBg from '../../../../assets/purple-frame-forgotpass.png'
import biodermisLogo from '../../../../assets/small-logo.png';
import { api } from "../../../../service/connection";
import { Heading } from "../../../shared/Heading";
import { Text } from "../../../shared/Text";
import { BtnWrapper, InputWrapper } from "../../Login/styles";
import { useState } from "react";



type ForgotPassType = {
    email: string;
    password: string;
};


export const ForgotPassStep1 = () => {

    const [authError, setAuthError] = useState<string | null>(null);

    const loginSchema = z.object({
        email: z.string({required_error: 'O e-mail é necessário para recuperar sua senha'})
        .min(1,'E-mail é necessário para recuperar sua senha')
        .email('Isto não é um email!')
    })

    const {handleSubmit, control, formState:{errors}} = useForm<ForgotPassType>({
        resolver: zodResolver(loginSchema),
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

        onSuccess:(res)=>{
            console.log(res)
          },
        onError:(err:any)=>{
            setAuthError(err.response?.data?.error || 'Erro ao realizar');
            console.log(err);
        }
    });

    

    const onSubmit = (data:ForgotPassType) => {

       mutation.mutate(data);
      
    }

    const handleInputChange = () => {
        if (authError) setAuthError(null); 
    };


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
            justify="center" 
            className="flex-col mx-auto w-full px-4 md:w-1/3">

                <div className="flex flex-col gap-4 mb-3">

                    <img 
                        src={biodermisLogo}
                        alt="Logo da biodermis"
                        className="w-1/3 mb-3"
                    />

                    <Heading.Root className="font-[500]"> 
                        <Heading.Content content="Esqueceu sua senha?" />
                    </Heading.Root>

                    <Text.Root className="mb-3 font-[300] text-gray-neutral-300">
                        <Text.Content 
                            content="Insira os dados para recuperar sua senha"
                        />

                    </Text.Root>

                    <Text.Root className="font-[300] text-gray-neutral-300">
                        <Text.Content 
                            content="Introduza o endereço de e-mail que utilizou quando aderiu e iremos enviar as instruções para repor a sua palavra-passe."
                        />
                    </Text.Root>

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

                <Flex className="flex-col">


                    <Controller
                    
                    control={control}
                    name="email"
                    render={({field:{onChange, value}})=> (

                        <Form.Item
                        name="email"
                        validateStatus={errors.email ? 'error' : 'success'}
                        help={errors.email && errors.email.message}
                        hasFeedback
                        >

                            <InputWrapper>
                            
                                <Input
                                className="ant-input my-4"
                                onChange={(e)=> {
                                    handleInputChange()
                                    onChange(e.target.value)
                                }}
                                value={value}
                                type="email"
                                placeholder="email"
                                /> 
                            
                            </InputWrapper>

                                
                        </Form.Item>
                
                    )}
                    
                    />
                    
                
                <Form.Item>
                        
                        <BtnWrapper>

                            <Button 
                            className="my-3 auth-btn bg-brand-purple text-white w-full text-center" 
                            htmlType="submit">

                                Continuar

                            </Button>

                        </BtnWrapper>


                </Form.Item>

                


                </Flex>

            </Form>


            </Flex>

        </div>


    )


}