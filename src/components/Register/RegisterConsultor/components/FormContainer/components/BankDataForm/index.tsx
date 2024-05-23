import { Controller } from "react-hook-form"
import { RegisterFieldProps } from "../../../../../@types/RegisterFieldsProps"
import Select from 'react-select';
import { DatePicker } from "antd";
import { DatePickerWrapper } from "./styles";
import dayjs from 'dayjs'
import { usePixkey } from "../../../../../../../hooks/usePixkey";
import { PatternFormat } from "react-number-format";
import { Form } from "../../../../../../shared/Form";
import { Input } from "../../../../../../shared/Input/Input";
import { UserData } from "../..";
import { bankOptions } from "../../../../../../../util/BankOptions";
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
 

            <Form.Group >

            
             <Controller 
              name="bankData.cardNumber"
              control={control}
              render={({field:{onChange}})=> {
                return (

                  <Item
                  name="bankData.cardNumber"
                  validateStatus={errors.bankData?.cardNumber ? 'error' : 'success'}
                  help={errors.bankData?.cardNumber && errors.bankData.cardNumber.message}
                  hasFeedback
                >

                  <Form.InputWrapper>

                        <label>
                            Número do cartão
                        </label>

                        <PatternFormat
                
                        format="#### #### #### ####" 
                        allowEmptyFormatting 
                        className="rounded-md py-2 px-2 border border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
                        onChange={onChange}
                        mask="_"
                        
                        />
                
                 </Form.InputWrapper>

                 </Item>
                    
                )
              }}
              />

                <Controller 
                control={control}
                name="bankData.cvv"
                render={({field:{onChange}})=> {
                return (

                  <Item
                  name="bankData.cvv"
                  validateStatus={errors.bankData?.cvv ? 'error' : 'success'}
                  help={errors.bankData?.cvv && errors.bankData.cvv.message}
                  hasFeedback
                  
                  >

                    <Form.InputWrapper>
                      
                      <Input.Root>

                      <Input.Label 
                      content="CVV"
                      className="text-black"
                      htmlFor="cvv"
                      />
                      <Input.System 
                      placeholder="123"
                      onChange={onChange}
                      id="cvv"
                      type="number"
                      maxLength={3}
                      />
                      
                      </Input.Root>

                    </Form.InputWrapper>


                  </Item>

                )}}

                />

       

           

            <Controller 
            control={control}
            name="bankData.titularName"
            render={({field:{onChange}})=> {

              return (

                <Item
                name="bankData.titularName"
                validateStatus={errors.bankData?.titularName ? 'error' : 'success'}
                help={errors.bankData?.titularName && errors.bankData.titularName.message}
                hasFeedback
                >

                  <Form.InputWrapper>

                  <Input.Root>

                    <Input.Label 
                    content="Nome no cartão"
                    className="text-black"
                    htmlFor="titularName"
                    />
                    <Input.System 
                    placeholder="leonardo de Souza Mazzuca"
                    onChange={onChange}
                    id="titularName"
                    /> 
                  
                  </Input.Root>

                </Form.InputWrapper>


                </Item>


              )}}

            />




                <Controller
                    control={control}
                    name="bankData.expireDate" 
                    rules={{ required: 'Por favor, selecione uma data de validade.' }}
                    render={({ field:{onChange} }) => (

                    <Item
                    name="bankData.expireDate"
                    validateStatus={errors.bankData?.expireDate ? 'error' : 'success'}
                    help={errors.bankData?.expireDate && errors.bankData.expireDate.message}
                    hasFeedback
                    
                    >

                      <Form.InputWrapper>

                          <label>
                              Data de validade
                          </label>
                                  
                            <DatePickerWrapper>
                                
                                <DatePicker
                                picker="month"
                                className="w-full rounded-md py-2 px-2 border border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
                                onChange={(_,dateString)=> {
                                  onChange(dateString)
                                }}
                        
                                defaultValue={dayjs(new Date())}
                                format={"MM/YYYY"}
                                
                                />

                            </DatePickerWrapper>

                            
                        </Form.InputWrapper>


                    </Item>
                      

                    )}

                />
                                    
               


         

            <Controller 
            control={control}
            name="bankData.agency"
            render={({field:{onChange}})=> {

              return (

                <Item
                name="bankData.agency"
                validateStatus={errors.bankData?.agency ? 'error' : 'success'}
                help={errors.bankData?.agency && errors.bankData.agency.message}
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
            name="bankData.pix"
            render={({field:{onChange}}) => {

              return (

                <Item
                name="bankData.pix"
                validateStatus={errors.bankData?.pix ? 'error' : 'success'}
                help={errors.bankData?.pix && errors.bankData.pix.message}
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
                          handlePixkeyChange(e)
                          onChange(e.target.value)
                          
                        }}
                        value={pixKey}
                        id="pixkey"
                        />
                          
                      </Input.Root>

                      </Form.InputWrapper>


                </Item>
                

              )}}

            />

     

         

                <Controller
                    control={control}
                    name="bankData.bank"
                    rules={{required:true}}
                    render={({ field:{onChange} }) => (



                      <Item
                      name="bankData.bank"
                      validateStatus={errors.bankData?.bank ? 'error' : 'success'}
                      help={errors.bankData?.bank && errors.bankData.bank.message}
                      hasFeedback
                      >


                          <Form.InputWrapper>

                              <label>
                                Banco
                              </label>
                        
                          
                          <Select
                              options={bankOptions}
                              isSearchable
                              defaultValue={bankOptions[0]} 
                              onChange={(selectedOption) => onChange(selectedOption?.value)} 
                          />


                      </Form.InputWrapper>

                      </Item>

                    )}

                    />
                                    
               

        


        </Form.Group >

        </Form.GroupWrapper>

    )

}