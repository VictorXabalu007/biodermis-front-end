import { Controller } from "react-hook-form";
import { RegisterFieldProps } from "../../../../../@types/RegisterFieldsProps";
import { PatternFormat } from "react-number-format";
import { Form } from "../../../../../../shared/Form";
import { Input } from "../../../../../../shared/Input/Input";
import { ConsultorsData } from "../..";


export const PessoalDataForm = ({ errors, control}: RegisterFieldProps<ConsultorsData>) => {

  return (

    <Form.GroupWrapper>

      <Form.SubHeader 
      heading="Dados Pessoais"
      subtext="Informe os dados pessoais do novo consultor"
    
      />

      <Form.Group >

            <Form.InputWrapper>
              
              <Controller
              control={control}
              name="name"
              render={({field})=> {
                return (

                  <Input.Root>

                    <Input.Label
                      className="text-black" 
                      htmlFor="username"
                      content="Nome"
                    />

                    <Input.System 
                    onChange={(e)=>{
                      field.onChange(e.target.value)
                    }}
                      id="username"
                      placeholder="Username"
                      
                    />
      
                    {errors.name && (
                      <small className="mt-1 text-red-600">
                        {errors.name?.message}
                      </small>
                    )}


                  </Input.Root>
          
                )
              }}

              />

            </Form.InputWrapper>

            <Form.InputWrapper>

              <label>CPF</label>

              <Controller 
              name="cpf"
              control={control}
              rules={{required: true}}
              render={({field})=> {
                return (

                    <>
                        <PatternFormat

                        format="###.###.###-##" 
                        allowEmptyFormatting 
                        mask="_" 
                        className="rounded-md py-2 px-2 border border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
                        onChange={(cpf => {
                            field.onChange(cpf)
                        })}
                        
                        
                        />

                        <>

                        {errors.cpf && (
                            <small className="text-red-600">
                                {errors.cpf.message} 
                            </small>
                        )}
                        
                        </>

                    </>

                    
                )
              }}
              />
              
            </Form.InputWrapper>

            <Form.InputWrapper >

              <Controller 
              control={control}
              name="email"
              render={({field})=> {
                return (
                
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

                      {errors.email && (
                        <small className="mt-1 text-red-600">
                          {errors.email?.message}
                        </small>
                      )} 
                        
                     </Input.Root>

                )}}
              
              />

            </Form.InputWrapper>

            <Form.InputWrapper >

              <label>Telefone</label>

              <Controller 
              name="phone"
              control={control}
              rules={{required: true}}
              render={({field})=> {
                return (

                    <>
                        <PatternFormat

                        format="(##) #####-####" 
                        allowEmptyFormatting 
                        mask="_" 
                        className="rounded-md py-2 px-2 border border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
                        onChange={(phone => {
                            field.onChange(phone)
                        })}
                        
                        
                        />

                        <>

                        {errors.phone && (
                            <small className="text-red-600">
                                {errors.phone.message} 
                            </small>
                        )}
                        
                        </>

                    </>

                    
                )
              }}
              />

     

            </Form.InputWrapper>

      </Form.Group >

    </Form.GroupWrapper>

  );
};
