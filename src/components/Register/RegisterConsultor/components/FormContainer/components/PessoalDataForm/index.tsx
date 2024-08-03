import { Controller } from "react-hook-form";
import { RegisterFieldProps } from "../../../../../@types/RegisterFieldsProps";
import { PatternFormat } from "react-number-format";
import { Form } from "../../../../../../shared/Form";
import { Input } from "../../../../../../shared/Input/Input";

import { InputWrapper } from "../../../../../../Auth/Login/styles";
import { InputPassword } from "../../../../../../shared/Input/Password";
import { FormItem } from "../../../../../../shared/Form/FormItem";
import { UserData } from "../../../../../../../validations/registerUserValidation";



export const PessoalDataForm = ({ errors, control}: RegisterFieldProps<UserData>) => {


  return (
 
    <Form.GroupWrapper>

      <Form.SubHeader 
      heading="Dados Pessoais"
      subtext="Informe os dados pessoais do novo usuário"
    
      />

      <Form.Group>
              
                <Controller
                control={control}
                name="nome"
                render={({field: {onChange}})=> {

                  return (

                    <FormItem
                      name="nome"
                      validateStatus={errors.nome ? 'error' : 'success'}
                      help={errors.nome && errors.nome.message}
                      hasFeedback
                    >

                    <Form.InputWrapper>
                    <Input.Root>

                      <Input.Label
                        className="text-black" 
                        htmlFor="username"
                        content="Nome"
                      />

                      <Input.System 
                      
                        onChange={(e)=>{
                          onChange(e.target.value)
                        }}
                        id="username"
                        placeholder="Username"
                        
                      />

                      </Input.Root>
                      </Form.InputWrapper>
                    </FormItem>
            
                  )
                  
                }}/>

                    
                    <Controller 
                    name="cpf"
                    control={control}
                    rules={{required: true}}
                    render={({field:{onChange}})=> {
                      return (

                          <FormItem
                          name="cpf"
                          validateStatus={errors.cpf ? 'error' : 'success'}
                          help={errors.cpf && errors.cpf.message}
                          hasFeedback
                          >

                            <Form.InputWrapper>

                              <label>CPF</label>

                              <PatternFormat

                              format="###.###.###-##" 
                              allowEmptyFormatting 
                              mask="_" 
                              className="rounded-md py-2 px-2 border border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
                              onChange={(e)=> {
                                onChange(e.target.value)
                              }}
                              
                              />

                              </Form.InputWrapper>

                          </FormItem>

                          
                      )
                    }}
                    />
              


         
      


                  <Controller 
                  control={control}
                  name="email"
                  render={({field})=> {
                    return (

                        <FormItem
                        name="email"
                        validateStatus={errors.email ? 'error' : 'success'}
                        help={errors.email && errors.email.message}
                        >

                        <Form.InputWrapper >
                              <Input.Root>

                                <Input.Label
                                  className="text-black" 
                                  htmlFor="email"
                                  content="E-mail"
                                />

                                <Input.System 
                                  onChange={(e)=>{
                                    field.onChange(e.target.value)
                                  }}
                                  id="email"
                                  placeholder="user@gmail.com"
                                  type="email"
                                  
                                />
                                
                            </Input.Root>
                          </Form.InputWrapper>


                        </FormItem>

                    )}}
                  
                  />
                  
                <Controller 
                name="telefone"
                control={control}
                rules={{required: true}}
                render={({field})=> {
                  return (

                    <FormItem 
                    name="telefone"
                    validateStatus={errors.telefone ? 'error' : 'success'}
                    help={errors.telefone && errors.telefone.message}>

                        <Form.InputWrapper >
                          
                          <label>Telefone</label>

                          <PatternFormat

                          format="(##) #####-####" 
                          allowEmptyFormatting 
                          mask="_" 
                          className="rounded-md py-2 px-2 border border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
                          onChange={(phone => {
                              field.onChange(phone)
                          })}
                          
                          
                          />
                          
                       </Form.InputWrapper>
                      </FormItem>
 
                  )
                }}
                />

                <Controller 
                name="senha"
                control={control}
                rules={{required: true}}
                render={({field})=> {
                  return (

                    <FormItem 
                    name="senha"
                    validateStatus={errors.senha ? 'error' : 'success'}
                    help={errors.senha && errors.senha.message}>

                        <Form.InputWrapper >
                          
                          <label>Senha</label>

                          <InputWrapper>
                            <InputPassword 
                              className="ant-input"
                              {...field}
                              placeholder="********"
                            />
                          
                          </InputWrapper>

                       </Form.InputWrapper>
                      </FormItem>
 
                  )
                }}
                />

      </Form.Group >

    </Form.GroupWrapper>

  );
};
