import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Flex, Form, Input, Typography } from "antd";
import { useMutation } from "@tanstack/react-query";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import forgotBg from "../../../../assets/purple-frame-forgotpass.png";
import biodermisLogo from "../../../../assets/small-logo.png";
import { api } from "../../../../service/connection";
import { useState } from "react";
import { MAIN_FORGOT_PASS } from "../../../../constants/sessionStorageKeys";
import { DEFAULT_PATH } from "../../../../constants/paths";
import { Text } from "../../../shared/Typography/typography-text";



export const ForgotPassStep2 = () => {

  const emailData = JSON.parse(sessionStorage.getItem(MAIN_FORGOT_PASS) ?? '');

  const navigate = useNavigate();


  const [resetError, setResetError] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState<string | null>(null);
  const [isLoading, setIsloading] = useState(false);


  const step2Schema = z.object({
    newPassword: z
      .string({
        required_error: "A nova senha é necessária para recuperar sua senha",
      })
      .min(1, "Nova senha é necessário para recuperar sua senha"),
    confirmPassword: z
      .string({
        required_error: "A senha de confirmação é necessária para recuperar sua senha",
      })
      .min(1, "A senha de confirmação é necessária para trocar sua senha!"),
    token: z.string({
        required_error: "O código de verificação é obrigatório!",
     }).min(1, 'O código de verificação é obrigatório...')
   
  })


  type ForgotPassType = z.infer<typeof step2Schema>;

  


  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ForgotPassType>({
    resolver: zodResolver(step2Schema),
    mode: "all",
    criteriaMode: "all",
  });


  
  const handleInputChange = () => {
    if (resetError) setResetError(null); 
  };




  const resetPass = useMutation({
    mutationFn: async (data: ForgotPassType) => {
     
      const body = {
        "email": emailData.email,
        "token": data.token,
        "senha": data.newPassword
      };

      const request = await api.post("/alterar_senha", body);

      return request.data;
    },

    onSuccess: (res) => {
    
      setResetSuccess(res.success)
      setIsloading(false)
      setTimeout(()=> {
        navigate(DEFAULT_PATH);
      },1500)

    },
    onError: (err: any) => {
      setResetError(err.response?.data?.error || "Erro ao realizar");
      setIsloading(false)
    },
  });




  const passSubmit = (data: ForgotPassType) => {

    resetPass.mutate(data)
    setIsloading(true);

   
  };


  const watchPass = watch(['newPassword','confirmPassword'])


  const [passForm] = Form.useForm();


  return (
    <div className="flex gap-3 items-center w-full min-h-screen">
      <img
        src={forgotBg}
        alt="Imagem de esqueceu a senha"
        className="w-1/2 min-h-screen md:flex hidden"
        style={{
          objectFit: "cover",
        }}
      />

      <Flex justify="center" className="flex-col mx-auto w-full px-4 md:w-1/3">
        <div className="flex flex-col gap-4 mb-3">
          <img
            src={biodermisLogo}
            alt="Logo da biodermis"
            className="w-1/3 mb-3"
          />

          <Typography.Title level={3}>
            Quase la...
          </Typography.Title>

          <Text className="my-3">
            Insira os dados para recuperar sua senha
          </Text>

          <Text>
            Introduza sua nova senha e confirme em seguida
          </Text>
        </div>

        <Form
          form={passForm}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={handleSubmit(passSubmit)}
          autoComplete="off"
        >



          <Flex className="flex-col">


            
            {resetError && (
                <Alert message={resetError} type="error" showIcon className="mb-3" />
            )}
            
            {resetSuccess && (
                <Alert message={resetSuccess} type="success" showIcon className="mb-3" />
            )}

            <Controller 
            control={control}
            name="newPassword"
            render={({field:{onChange,value}})=> (

                <Form.Item

                name="password"
                validateStatus={errors.newPassword ? 'error' : 'success'}
                help={errors.newPassword && errors.newPassword.message}

                >

           
                    
                        <Input.Password 
                    
                        onChange={(e)=> {
                          onChange(e.target.value)
                          handleInputChange();
                        }}
                        value={value}
                        />
                    
           

                </Form.Item>

            )}
            />

            <Controller 
            control={control}
            name="confirmPassword"
            render={({field:{onChange,value}})=> (

                <Form.Item
                name="confirmPassword"
                dependencies={["password"]}
                validateStatus={errors.confirmPassword ? 'error' : 'success'}
                help={errors.confirmPassword && errors.confirmPassword.message}
                rules={[
                    ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                        
                        }
                        return Promise.reject(
                        new Error(
                            "As senha não são iguais"
                        )
                        );
                    },
                    }),
                ]}
                >

         
                
                    <Input.Password 
                        onChange={(e)=> {
                          onChange(e.target.value)
                          handleInputChange()
                        }}
                        value={value}
             
                    />

       
                </Form.Item>


            )}

            />

              {watchPass[0] && watchPass[1] && watchPass[0] === watchPass[1] &&

                <>
                
      
                <Typography.Title level={4}>
                 Código de verificação
                </Typography.Title>

                <Text className="my-5">
                  Insira o código de verificação enviado para {emailData.email}
                </Text>
                
                
                <Controller 
                    control={control}
                    name="token"
                    render={({field})=> (

                        <Form.Item
                        name="token"
                        validateStatus={errors.token ? 'error' : 'success'}
                        help={errors.token && errors.token.message}
                        >

                  
                        
                            <Input 
                        
                                placeholder="token de verificação"
                                {...field}
                               
                            />

                      

                        </Form.Item>


                    )}

                  />
                </>
              
              
              
              }



          
                <Button
                  loading={isLoading}
                  htmlType="submit"
                  className="mt-3"
                >
                  Continuar
                </Button>
           


            
          
          </Flex>
        </Form>
      </Flex>
    </div>
  );
};
