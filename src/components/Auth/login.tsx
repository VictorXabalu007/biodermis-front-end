import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Form, Alert, Input, Typography } from 'antd';
import { useMutation } from "@tanstack/react-query";
import { api } from "../../service/connection";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "../shared/Link";
import { FORGOT_PASS_1, HOME } from "../../constants/paths/paths";
import { useState } from "react";
import { AUTH_USER } from "../../constants/SessionStorageKeys/sessionStorageKeys";
import { Text } from "../shared/Typography/typography-text";
import { biodermisSMLogo, welcomeBg } from "../../util/projectImage";

export type LoginType = {
  email: string;
  password: string;
};

export const Login = () => {

  const [authError, setAuthError] = useState<string | null>(null); 
  const [isLoading ,setIsLoading] = useState(false);

  const loginSchema = z.object({
    email: z.string({ required_error: 'Email não pode ser vazio' })
      .min(1, 'E-mail é necessário para o cadastro')
      .email('Isto não é um email!'),
    password: z.string({ required_error: 'A senha é necessária para entrar' })
      .min(1, 'Senha não pode ser vazia!!')
  });

  const { handleSubmit, control, formState: { errors } } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    mode: 'all',
    criteriaMode: 'all'
  });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data: LoginType) => {
      const body = {
        email: data.email,
        senha: data.password
      };

      const request = await api.post('/login', body,{
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return request.data;

    },
    onSuccess: (res) => {
      sessionStorage.setItem(AUTH_USER, JSON.stringify(res));
      sessionStorage.setItem('token', JSON.stringify(res.token))
      sessionStorage.setItem('email', JSON.stringify(res.usuario.email))
      navigate(HOME);


      
      setIsLoading(false)
  
    },
    onError: (err: any) => {

      setAuthError(err.response?.data?.error || 'Erro ao fazer login');
      setIsLoading(false)

    },
  });



  const onSubmit = (data: LoginType) => {

    mutation.mutate(data);
    setIsLoading(true)
    

  };

  const handleInputChange = () => {
    if (authError) setAuthError(null); 
  };


  const [form] = Form.useForm();

  return (

    <div className="flex gap-3 items-center w-full min-h-screen">
      <img
        src={welcomeBg}
        alt="Imagem de bem vindo"
        className="w-1/2 min-h-screen md:flex hidden"
        style={{ objectFit: 'cover' }}
      />

      <Flex justify="center" className="flex-col mx-auto w-full px-4 md:w-1/3">
        <div className="flex flex-col gap-4 mb-3">
          <img
            src={biodermisSMLogo}
            alt="Logo da biodermis"
            className="w-1/3"
          />
          <Typography.Title style={{margin:0}} level={4}>
            Bem vindo!
          </Typography.Title>
          <Text>
            Insira os dados para acessar sua conta
          </Text>
        </div>

        {authError && (
          <Alert
            message={authError}
            type="error"
            showIcon
            className="mb-3"
          />
        )}

        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <Flex className="flex-col">
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Form.Item
                  name="email"
                  validateStatus={errors.email ? 'error' : 'success'}
                  help={errors.email && errors.email.message}
                >
                  <Input
                    placeholder="seuemail@email.com"
                    {...field}
                  />
                </Form.Item>
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Form.Item
                  validateStatus={errors.password ? 'error' : 'success'}
                  help={errors.password && errors.password.message}
                  name="password"
                >
             
                    <Input.Password
                      className="ant-input ant-input-pass"
                      value={value}
                      onChange={(e) => {
                        handleInputChange();
                        onChange(e);
                      }}
                      placeholder="Senha"
                    />
             
                </Form.Item>
              )}
            />

            <Link.Root
              className="ms-auto mb-3 font-[400] text-gray-neutral-400"
              path={FORGOT_PASS_1}
            >
              <Link.Content content="Esqueci minha senha" />
            </Link.Root>

    
           
                <Button
                  loading={isLoading}
                  htmlType="submit"
                  size="large"
               
                >
                  Entrar
                </Button>
          
              
          
          </Flex>
        </Form>
      </Flex>
    </div>
  );
};