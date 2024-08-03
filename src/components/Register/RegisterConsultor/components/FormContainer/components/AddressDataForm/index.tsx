import { PatternFormat } from "react-number-format";
import { RegisterFieldProps } from "../../../../../@types/RegisterFieldsProps";
import { Controller } from "react-hook-form";
import { Form } from "../../../../../../shared/Form";
import { Input } from "../../../../../../shared/Input/Input";

import { Form as AntdForm } from "antd";
import { UserData } from "../../../../../../../validations/registerUserValidation";

export const AddressDataForm = ({ errors, control }: RegisterFieldProps<UserData>) => {

  const Item = AntdForm.Item;

  return (

    <Form.GroupWrapper>
      
        <Form.SubHeader 
        heading="Endereço"
        subtext="Informe o endereço do novo usuário"
        />

      <Form.Group>

            <Controller 
            control={control}
            name="estado"
            render={({field:{onChange}})=> {
              return (

              <Item
                name="estado"
                validateStatus={errors.estado ? 'error' : 'success'}
                help={errors.estado && errors.estado.message}
                hasFeedback
              >


                <Form.InputWrapper >
                        
                        <Input.Root>

                          <Input.Label 
                          content="Estado"
                          className="text-black"
                          htmlFor="state"
                          />
                          <Input.System 
                          placeholder="SP"
                          onChange={onChange}
                          id="state"
                          /> 
                        
                        </Input.Root>

                  </Form.InputWrapper >


              </Item>

              )}}

            />

          <Controller
            name="cep"
            control={control}
            render={({ field:{onChange} }) => {
              return (  
                
                <Item
                  name="cep"
                  validateStatus={errors.cep ? 'error' : 'success'}
                  help={errors.cep && errors.cep.message}
                  hasFeedback
                >

                  <Form.InputWrapper >
                    
                    <label>CEP</label>
              
                    <PatternFormat
                      format="#####-###"
                      allowEmptyFormatting
                      mask="_"
                      className="rounded-md py-2 px-2 border border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
                      onChange={onChange}
                
                    />
      
                  </Form.InputWrapper >

                </Item>

              );
            }}
          />
     

      

        <Controller 
            control={control}
            name="rua"
            render={({field:{onChange}})=> {
              return (

                <Item
                name="rua"
                validateStatus={errors.rua ? 'error' : 'success'}
                help={errors.rua && errors.rua.message}
                hasFeedback
                >

                  <Form.InputWrapper >
                    <Input.Root>

                      <Input.Label 
                      content="Rua"
                      className="text-black"
                      htmlFor="street"
                      />
                      <Input.System 
                      placeholder="Rua tal"
                      onChange={onChange}
                      id="street"
                      />
                  
                    </Input.Root>

                  </Form.InputWrapper >

                </Item>

              )}}
              
            />


   

          <Controller 
            control={control}
            name="bairro"
            render={({field:{onChange}})=> {
              return (

                <Item
                name="bairro"
                validateStatus={errors.bairro ? 'error' : 'success'}
                help={errors.bairro && errors.bairro.message}
                hasFeedback
                >

                  <Form.InputWrapper >
                    <Input.Root>

                      <Input.Label 
                      content="Bairro"
                      className="text-black"
                      htmlFor="neighborhood"
                      />
                      <Input.System 
                      placeholder="Bairro tal"
                      onChange={onChange}
                      id="neighborhood"
                      />

                    
                    </Input.Root>
                  </Form.InputWrapper >

                </Item>

              )}}

            />


     
          
        <Controller 
            control={control}
            name="cidade"
            render={({field:{onChange}})=> {
              return (

                <Item
                name="cidade"
                validateStatus={errors.cidade ? 'error' : 'success'}
                help={errors.cidade && errors.cidade.message}
                hasFeedback
                >

                  <Form.InputWrapper >
                    <Input.Root>

                      <Input.Label 
                      content="Cidade"
                      className="text-black"
                      htmlFor="city"
                      />
                      <Input.System 
                      placeholder="Cidade tal"
                      onChange={onChange}
                      id="city"
                      />

                    
                    </Input.Root>
                  </Form.InputWrapper >


                </Item>

              )}}

            />


    

           <Controller 
           
            control={control}
            name="numero"
            render={({field:{onChange}})=> {
              return (

                <Item
                  name="number"
                  validateStatus={errors.numero ? 'error' : 'success'}
                  help={errors.numero && errors.numero.message}
                  hasFeedback
                >

                  <Form.InputWrapper >
                  <Input.Root>

                    <Input.Label 
                    content="Número"
                    className="text-black"
                    htmlFor="number"
                    />
                    <Input.System 
                    placeholder="0000"
                    onChange={onChange}
                    id="number"
                    type="number"
                    />

      
                    
                    </Input.Root>
                  </Form.InputWrapper >


                </Item>

              )}}

            />
           <Controller 
           
            control={control}
            name="complemento"
            render={({field:{onChange}})=> {
              return (

                <Item
                  name="number"
                  validateStatus={errors.complemento ? 'error' : 'success'}
                  help={errors.complemento && errors.complemento.message}
                  hasFeedback
                >

                  <Form.InputWrapper >
                  <Input.Root>

                    <Input.Label 
                    content="Complemento"
                    className="text-black"
                    htmlFor="complemento"
                    />
                    <Input.System 
                    placeholder="0000"
                    onChange={onChange}
                    id="number"
                    type="complemento"
                    />

      
                    
                    </Input.Root>
                  </Form.InputWrapper >


                </Item>

              )}}

            />
   




      </Form.Group>

    </Form.GroupWrapper>

  );

};
