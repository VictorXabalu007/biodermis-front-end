import { Alert, Flex } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { FormItem } from "../../../../../components/shared/Form/FormItem";
import { Input } from "../../../../../components/shared/Input/Input";
import { PatternFormat } from "react-number-format";
import { Form } from "../../../../../components/shared/Form";
import { InputWrapper } from "../../../../../components/Auth/Login/styles";
import { InputPassword } from "../../../../../components/shared/Input/Password";
import { Button } from "../../../../../components/shared/Button";
import { useFieldChange } from "../../../../useFieldChange/useFieldChange";
import { FormType } from "../../../../../@types/FormType/FormType";
import { UserCredentials } from "../../../../../@types/UserData/UserData";
import { UserRole } from "../../../../../util/UserRole";




export const FormStep1 = ({isReadonly, data, onSubmit}:FormType<UserCredentials>) => {

    const { control, handleSubmit, formState:{errors} } = useFormContext<UserCredentials>();

    const {
        fields,
        handleChange
    } = useFieldChange<UserCredentials>({data});
    

    return (
            

        <form onSubmit={handleSubmit(onSubmit)}>

        {data.cargo_id === UserRole.USER &&
        
            <Alert
            className="my-3"
            type="warning"
            message="Não é possível editar dados de um cliente"
            />
        
        }

        <Flex gap={10} className="mt-5 flex-col">

            <Controller 
            name="nome"
            control={control}
            rules={{required: true}}
            render={({field:{onChange, name}})=> (
            
                <FormItem
                className="w-full"
                name="name"
                validateStatus={errors.nome ? 'error' : 'success'}
                help={errors.nome && errors.nome.message}
                hasFeedback
                >

                    <Input.Root>
                    
                        <Input.Label 
                        className="text-gray-neutral-400"
                        content="Nome"
                        htmlFor="name"
                        />
                        <Input.System
                        placeholder={'name...'}
                        id="name"
                        onChange={(e)=> {
                            handleChange(name,e)
                            onChange(e.target.value)
                        }}
                        value={fields.nome}
                        readOnly={isReadonly}
                        />

                    </Input.Root>

                </FormItem>

            )}
            />


        <Flex justify="space-between" gap={10}>

            <Controller 
            name="cpf"
            control={control}
            rules={{required: true}}
            render={({field:{onChange, name}})=> (

                <FormItem
                className="w-full"
                name="cpf"
                validateStatus={errors.cpf ? 'error' : 'success'}
                help={errors.cpf && errors.cpf.message}
                hasFeedback
                >

                    <Form.InputWrapper>

                        <Input.Root className="w-full">
                            
                            <Input.Label 
                            className="text-gray-neutral-400"
                            content="CPF"
                            htmlFor="cpf"
                            />

                            <PatternFormat

                            format="###.###.###-##" 
                            allowEmptyFormatting 
                            mask="_" 
                            className="rounded-md py-2 px-1 border border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
                            onChange={(e)=> {
                                handleChange(name,e);
                                onChange(e.target.value);
                            }}
                            value={fields.cpf}
                            readOnly={isReadonly}
                            
                            
                            />

                        </Input.Root>


                    </Form.InputWrapper>




                </FormItem>

            )}
            
            />

            <Controller 
            rules={{required: true}}
            control={control}
            name="telefone"
            render={({field:{onChange, name}})=> (

                <FormItem
                className="w-full"
                name="phone"
                validateStatus={errors.telefone ? 'error' : 'success'}
                help={errors.telefone && errors.telefone.message}
                hasFeedback
                >
                    <Form.InputWrapper>

                        <Input.Root  className="w-full">
                            
                            <Input.Label 
                            className="text-gray-neutral-400"
                            content="Telefone"
                            htmlFor="phone"
                            />

                            <PatternFormat

                            format="(##) #####-####" 
                            allowEmptyFormatting 
                            mask="_" 
                            className="rounded-md py-2 px-2 border border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
                            value={fields.telefone}
                            readOnly={isReadonly}
                            onChange={(e)=> {
                                handleChange(name,e);
                                onChange(e.target.value);
                            }}


                            />

                        </Input.Root>



                    </Form.InputWrapper>



                </FormItem>


            )}
            
            />

        </Flex>


            
            <Controller 
            rules={{required: true}}
            name="email"
            render={({field:{onChange, name}})=> (

                <FormItem
                name="email"
                validateStatus={errors.email ? 'error' : 'success'}
                help={errors.email && errors.email.message}
                hasFeedback
                >

                <Input.Root>

                    <Input.Label 
                    className="text-gray-neutral-400"
                    content="E-mail"
                    htmlFor="email"
                    />

                    <Input.System
                    type="email"
                    placeholder={'email...'}
                    id="email"
                    value={fields.email}
                    readOnly={isReadonly}
                    onChange={(e)=> {
                        handleChange(name,e);
                        onChange(e.target.value);
                    }}

                    />

                </Input.Root>



                </FormItem>


                )}
            />

        <Controller 
            name="senha"
            control={control}
            rules={{required: true}}
            render={({field:{onChange}})=> {
              return (

                <FormItem 
                name="senha"
                validateStatus={errors.senha ? 'error' : 'success'}
                help={errors.senha && errors.senha.message}>

                    <Form.InputWrapper >
                      
                      <label>Senha</label>

                      <InputWrapper>
                        <InputPassword 
                        
                          className="ant-input py-2"
                          onChange={onChange}
                            
                        />
                      
                      </InputWrapper>

                   </Form.InputWrapper>
                  </FormItem>

              )
            }}
            />
            
        </Flex>



        {!isReadonly &&

            <Button.Root htmlType="submit" className="mt-4 w-full">
                <Button.Wrapper>
                    <Button.Content content="Confirmar" />
                </Button.Wrapper>
            </Button.Root>

        }


    </form>

    );

}