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
import { ConsultorsData } from "../..";

const selectOptions = [
    { value: 'caixa', label: 'Caixa' },
    { value: 'mastercard', label: 'Mastercard' },
    { value: 'visa', label: 'Visa' },
];

export const BankDataForm = ({errors,control}:RegisterFieldProps<ConsultorsData>) => {

    
    const {pixKey, handlePixkeyChange} = usePixkey();

    return (

        <Form.GroupWrapper>


            <Form.SubHeader 
                    heading="Dados bancários"
                    subtext="Informe os dados bancários do novo consultor"
            />
 

            <Form.Group >

                    
            <Form.InputWrapper>

                <label>
                    Número do cartão
                </label>

             <Controller 
              name="bankData.cardNumber"
              control={control}
              rules={{required: true}}
              render={({field})=> {
                return (

                    <>
                        <PatternFormat
                
                        format="#### #### #### ####" 
                        allowEmptyFormatting 
                        className="rounded-md py-2 px-2 border border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
                        onChange={(cpf => {
                            field.onChange(cpf)
                        })}
                        mask="_"
                        
                        />

                        <>

                        {errors.bankData?.cardNumber && (
                            <small className="text-red-600">
                                {errors.bankData?.cardNumber?.message} 
                            </small>
                        )}
                        
                        </>

                    </>

                    
                )
              }}
              />

            </Form.InputWrapper>

            <Form.InputWrapper>

                <Controller 
                control={control}
                name="bankData.cvv"
                render={({field})=> {
                return (
                    
                    <Input.Root>

                    <Input.Label 
                    content="CVV"
                    className="text-black"
                    htmlFor="cvv"
                    />
                    <Input.System 
                    placeholder="123"
                    onChange={(e)=> {
                        field.onChange(e.target.value)
                    }}
                    id="cvv"
                    type="number"
                    maxLength={3}
                    />

                    {errors.bankData?.cvv && (
                    <small className="mt-1 text-red-600">{errors.bankData.cvv?.message}</small>
                    )}  
                    
                    </Input.Root>

                )}}

                />

            </Form.InputWrapper>

            <Form.InputWrapper>

            <Controller 
            control={control}
            name="bankData.titularName"
            render={({field})=> {

              return (

                <Input.Root>

                  <Input.Label 
                  content="Nome no cartão"
                  className="text-black"
                  htmlFor="titularName"
                  />
                  <Input.System 
                  placeholder="leonardo de Souza Mazzuca"
                  onChange={(e)=> {
                    field.onChange(e.target.value)
                  }}
                  id="titularName"
                  />

                {errors.bankData?.titularName && (
                  <small className="mt-1 text-red-600">{errors.bankData.titularName?.message}</small>
                )}  
                
                </Input.Root>

              )}}

            />

            </Form.InputWrapper>

            <Form.InputWrapper
            
            >

                <label>
                    Data de validade
                </label>


                <Controller
                    control={control}
                    name="bankData.expireDate" 
                    rules={{ required: 'Por favor, selecione uma data de validade.' }}
                    render={({ field }) => (
                        
                        <DatePickerWrapper>
                            
                            <DatePicker
                            picker="month"
                            className="w-full rounded-md py-2 px-2 border border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
                            onChange={(_,dateString)=> {
                               field.onChange(dateString)
                       
                            }}
                     
                            defaultValue={dayjs(new Date())}
                            format={"MM/YYYY"}
                            
                            />

                            {errors.bankData?.expireDate && (
                                <small
                                 className="text-red-600">{errors.bankData?.expireDate?.message}
                                </small>
                            )}

                        </DatePickerWrapper>

                    )}

                />
                                    
               

            </Form.InputWrapper>

            <Form.InputWrapper>

            <Controller 
            control={control}
            name="bankData.agency"
            render={({field})=> {

              return (

                <Input.Root>

                  <Input.Label 
                  content="Agência"
                  className="text-black"
                  htmlFor="agency"
                  />
                  <Input.System 
                  placeholder="0000"
                  onChange={(e)=> {
                    field.onChange(e.target.value)
                  }}
                  id="agency"
                  />

                {errors.bankData?.agency && (
                  <small className="mt-1 text-red-600">{errors.bankData.agency?.message}</small>
                )}  
                
                </Input.Root>

              )}}

            />

            </Form.InputWrapper>



            <Form.InputWrapper>



            <Controller 
            control={control}
            name="bankData.pix"
            render={({field})=> {

              return (

                <Input.Root>

                  <Input.Label 
                  content="Chavep pix"
                  className="text-black"
                  htmlFor="pixkey"
                  />
                  <Input.System 
                  placeholder="123"
                  onChange={(e)=> {
                    handlePixkeyChange(e)
                    field.onChange(e.target.value)
                    
                  }}
                  value={pixKey}
                  id="pixkey"
                  />

                    {errors.bankData?.pix && (
                    <small className="mt-1 text-red-600">{errors.bankData.pix?.message}</small>
                    )}  
                    
                </Input.Root>

              )}}

            />

                {/* <label>
                   Pix
                </label>
                
                    <input 
                        className="rounded-md py-2 px-2 border border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
                        {...register('bankData.pix')}
                        placeholder="123"
                        onChange={handlePixkeyChange}
                        value={pixKey}
                    />
                                    
                {errors.bankData?.pix && (
                    <p className="text-red-600">{errors.bankData?.pix?.message}</p>
                )} */}

            </Form.InputWrapper>

            <Form.InputWrapper
       
            >

                <label>
                   Banco
                </label>

                <Controller
                    control={control}
                    name="bankData.bank"
                    rules={{required:true}}
                    render={({ field }) => (
                    
                    
                    <Select
                        options={selectOptions}
                        isSearchable
                        defaultValue={selectOptions[0]} 
                        onChange={(selectedOption) => field.onChange(selectedOption?.value)} 
                    />

                    )}

                    />
                                    
                {errors.bankData?.bank && (
                    <p className="text-red-600">{errors.bankData?.bank?.message}</p>
                )}

            </Form.InputWrapper>


        </Form.Group >

        </Form.GroupWrapper>

    )

}