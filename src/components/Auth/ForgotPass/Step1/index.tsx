
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
import { Spinner } from "../../../shared/Spinner";
import { FORGOT_PASS_2 } from "../../../../constants/paths/paths";
import { MAIN_FORGOT_PASS } from "../../../../constants/SessionStorageKeys/sessionStorageKeys";
import { FaArrowLeftLong } from "react-icons/fa6";



type ForgotPassType = {
    email: string;
    password: string;
};


export const ForgotPassStep1 = () => {

    const [authError, setAuthError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [touchedField, setTouchedFiled] = useState(false);

    const loginSchema = z.object({
        email: z.string({required_error: 'O e-mail é necessário para recuperar sua senha'})
        .min(1,'E-mail é necessário para recuperar sua senha')
        .email('Isto não é um email!'),
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
                        hasFeedback={touchedField}
                        >

                            <InputWrapper>
                            
                                <Input
                                className="ant-input my-4 rounded-md py-1 border-gray-neutral-200"
                                onChange={(e)=> {
                                    handleInputChange()
                                    onChange(e.target.value)
                                }}
                                onBlur={()=>  setTouchedFiled(true)}
                                value={value}
                                type="email"
                                placeholder="email"
                                /> 
                            
                            </InputWrapper>

                                
                        </Form.Item>
                
                    )}
                    
                    />
                    
                
                <Form.Item>
                        

                        {isLoading ? 
                        <>
                            <Spinner 
                                content="Enviando..."
                            />
                        </> : (


                        <BtnWrapper>

                            <Button 
                            className="my-3 auth-btn bg-brand-purple text-white w-full text-center" 
                            htmlType="submit">

                                Continuar

                            </Button>

                        </BtnWrapper>


                        )} 


                </Form.Item>

                


                </Flex>

            </Form>


            </Flex>

        </div>


    )


}