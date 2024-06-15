import { Controller } from "react-hook-form"
import { RegisterFieldProps } from "../../../../../@types/RegisterFieldsProps"
import { usePixkey } from "../../../../../../../hooks/usePixkey";
import { Form } from "../../../../../../shared/Form";
import { Input } from "../../../../../../shared/Input/Input";
import { UserData } from "../..";
import { Form as AntdForm } from "antd";

const Item = AntdForm.Item;

export const BankDataForm = ({errors,control}:RegisterFieldProps<UserData>) => {
    
    const {pixKey, handlePixkeyChange} = usePixkey();


    return (

        <Form.GroupWrapper>


            <Form.SubHeader 
                  heading="Dados bancários"
                  subtext="Informe os dados bancários do novo usuário"
            />
 

            <Form.Group>

            
             <Controller 
              name="conta"
              control={control}
              render={({field:{onChange,name}})=> {
                return (

                  <Item
                  name={name}
                  validateStatus={errors?.conta ? 'error' : 'success'}
                  help={errors?.conta && 
                    errors.conta.message}
                  hasFeedback
                >

                  <Form.InputWrapper>


                        <label>
                          Número da Conta
                        </label>

                        <Input.System 
                        placeholder="0000"
                        onChange={onChange}
                        id="number"
                        type="number"
                        /> 
                
                 </Form.InputWrapper>

                 </Item>
                    
                )
              }}
              />

      
         

            <Controller 
            control={control}
            name="agencia"
            render={({field:{onChange, name}})=> {

              return (

                <Item
                name={name}
                validateStatus={errors?.agencia ? 'error' : 'success'}
                help={errors?.agencia
                   && errors.agencia.message}
                hasFeedback
                
                >

                    <Form.InputWrapper>

                    <Input.Root>

                      <Input.Label 
                      content="Agência"
                      className="text-black"
                      htmlFor="agency"
                      />
                      <Input.System 
                      placeholder="0000"
                      onChange={onChange}
                      id="agency"
                      /> 
                    
                    </Input.Root>

                    </Form.InputWrapper>


                </Item>


              )}}

            />


            <Controller 
            control={control}
            name="pix"
            render={({field:{onChange, name, value}}) => {

              return (

                <Item
                name={name}
                validateStatus={errors?.pix ? 'error' : 'success'}
                help={errors?.pix && errors.pix.message}
                hasFeedback
                >

                  <Form.InputWrapper>

                      <Input.Root>

                        <Input.Label 
                        content="Chave pix"
                        className="text-black"
                        htmlFor="pixkey"
                        />
                        <Input.System 
                        placeholder="123"
                        onChange={(e)=> {
                         
                          onChange(e.target.value)
                          handlePixkeyChange(e)
                          
                        }}
                        value={value}
                        onBlur={()=> {
                          onChange(pixKey)
                        }}
                        id="pixkey"
                        />
                          
                      </Input.Root>

                      </Form.InputWrapper>


                </Item>
                

              )}}

            />

  
        </Form.Group >

        </Form.GroupWrapper>

    )

}