import { PatternFormat } from "react-number-format";
import { RegisterFieldProps } from "../../../../../@types/RegisterFieldsProps";
import { Controller } from "react-hook-form";
import { Form } from "../../../../../../shared/Form";
import { Input } from "../../../../../../shared/Input/Input";
import { UserData } from "../..";
import { Form as AntdForm } from "antd";

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
            name="address"
            render={({field:{onChange}})=> {
              return (

              <Item
                name="address"
                validateStatus={errors.address ? 'error' : 'success'}
                help={errors.address && errors.address.message}
                hasFeedback
              >


                <Form.InputWrapper >
                        
                        <Input.Root>

                          <Input.Label 
                          content="Endereço"
                          className="text-black"
                          htmlFor="address"
                          />
                          <Input.System 
                          placeholder="Rua tal Bairro tal"
                          onChange={onChange}
                          id="address"
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
            name="street"
            render={({field:{onChange}})=> {
              return (

                <Item
                name="street"
                validateStatus={errors.street ? 'error' : 'success'}
                help={errors.street && errors.street.message}
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
            name="neighborhood"
            render={({field:{onChange}})=> {
              return (

                <Item
                name="neighborhood"
                validateStatus={errors.neighborhood ? 'error' : 'success'}
                help={errors.neighborhood && errors.neighborhood.message}
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
            name="city"
            render={({field:{onChange}})=> {
              return (

                <Item
                name="city"
                validateStatus={errors.city ? 'error' : 'success'}
                help={errors.city && errors.city.message}
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
            name="number"
            render={({field:{onChange}})=> {
              return (

                <Item
                  name="number"
                  validateStatus={errors.number ? 'error' : 'success'}
                  help={errors.number && errors.number.message}
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
           name="complement"
           render={({field:{onChange}})=> {
             return (

              <Item
              name="complement"
              validateStatus={errors.complement ? 'error' : 'success'}
              help={errors.complement && errors.complement.message}
              hasFeedback
              >

                  <Form.InputWrapper>
                    <Input.Root>

                      <Input.Label 
                      content="Complemento"
                      className="text-black"
                      htmlFor="complement"
                      />
                      <Input.System 
                      placeholder="0000"
                      onChange={onChange}
                      id="complement"
                      type="number"
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
