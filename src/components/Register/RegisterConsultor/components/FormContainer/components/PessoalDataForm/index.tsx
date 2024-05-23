import { Controller } from "react-hook-form";
import { RegisterFieldProps } from "../../../../../@types/RegisterFieldsProps";
import { PatternFormat } from "react-number-format";
import { Form } from "../../../../../../shared/Form";
import { Input } from "../../../../../../shared/Input/Input";
import { UserData } from "../..";
import { Form as AntdForm } from "antd";

const Item = AntdForm.Item;

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
                name="name"
                render={({field: {onChange}})=> {

                  return (

                    <Item
                      name="name"
                      validateStatus={errors.name ? 'error' : 'success'}
                      help={errors.name && errors.name.message}
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
                    </Item>
            
                  )
                  
                }}/>

                    
                    <Controller 
                    name="cpf"
                    control={control}
                    rules={{required: true}}
                    render={({field:{onChange}})=> {
                      return (

                          <Item
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

                          </Item>

                          
                      )
                    }}
                    />
              


         
      


                  <Controller 
                  control={control}
                  name="email"
                  render={({field})=> {
                    return (

                        <Item
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


                        </Item>

                    )}}
                  
                  />
                  
                <Controller 
                name="phone"
                control={control}
                rules={{required: true}}
                render={({field})=> {
                  return (

                    <Item 
                    name="phone"
                    validateStatus={errors.phone ? 'error' : 'success'}
                    help={errors.phone && errors.phone.message}>

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
                      </Item>
 
                  )
                }}
                />

      </Form.Group >

    </Form.GroupWrapper>

  );
};
