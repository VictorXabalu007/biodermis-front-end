
import { Input } from "../../../../../../shared/Input/Input";
import { Button } from "../../../../../../shared/Button";
import { Form } from "../../../../../../shared/Form";
import Select from 'react-select'
import { Controller, useFormContext } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { DatePicker } from "antd";
import dayjs from 'dayjs'
import { DatePickerWrapper } from "../../../../../../Register/RegisterConsultor/components/FormContainer/components/BankDataForm/styles";
import { bankOptions } from "../../../../../../../util/BankOptions";
import { FormType } from "../../../../../../../@types/FormType/FormType";

export const FormStep3 = ({isReadonly}:FormType) => {

    const { handleSubmit, control } = useFormContext();

    const onSubmit = (data:any) => {
        console.log(data);
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)}>

                <Controller 
                control={control}
                name="cardNumber"
                render={({field:{onChange, value}})=> (
                    
                    <Form.InputWrapper>
    
                        <Input.Root>
                        
                            <Input.Label 
                            className="text-gray-neutral-400"
                            content="Número do cartão"
                            htmlFor="cardNumber"
                            />
    
                     <PatternFormat
                
                        format="#### #### #### ####" 
                        allowEmptyFormatting 
                        className="rounded-md py-2 px-2 border border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
                        onChange={onChange}
                        mask="_"
                        value={value}
                        readOnly={isReadonly}
                        
                        
                        />
    
                        </Input.Root>
    
                    </Form.InputWrapper>


                )}
                />

            
            <Form.Group>

                <Controller
                control={control}
                name="cvv"
                render={({field:{onChange, value}})=> (

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
                    value={value}
                    readOnly = {isReadonly}
                     />


                    </Input.Root>

                </Form.InputWrapper>
                )}
                
                />

                
                <Controller
                control={control}
                name="expireDate"
                render={({field:{onChange}})=> (

                <Form.InputWrapper>

                    <Input.Root>
                        
                        <Input.Label 
                        className="text-gray-neutral-400"
                        content="Data de validade"
                        htmlFor="expireDate"
                        />

                        <DatePickerWrapper>

                            <DatePicker
                                picker="month"
                                className="w-full rounded-md py-2 px-2 border border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
                                onChange={(_,dateString)=> {
                                onChange(dateString)}}
                                defaultValue={dayjs(new Date())}
                                format={"MM/YYYY"}
                                readOnly={isReadonly}
                                
                                />


                        </DatePickerWrapper>


                    </Input.Root>

                </Form.InputWrapper>

                )}
                />

                    <Controller 
                    control={control}
                    name="cardName"
                    render={({field:{onChange, value}})=> (

                        <Form.InputWrapper>

                            <Input.Root>
                                
                                <Input.Label 
                                className="text-gray-neutral-400"
                                content="Nome no cartão"
                                htmlFor="cardName"
                                />
                                <Input.System
                                placeholder={'ex: Gustavo Henrique'}
                                id="cardName"
                                onChange={onChange}
                                value={value}
                                readOnly={isReadonly}
                                
                                />


                            </Input.Root>


                        </Form.InputWrapper>


                    )}
                    />
                    
                <Controller 
                control={control}
                name="bank"
                render={({field:{onChange}})=> (

                    <Form.InputWrapper>

                        <Input.Label 
                            className="text-gray-neutral-400 m-0"
                            content="Banco"
                            htmlFor="bank"
                        />

                    
                        <Select
                         options={bankOptions}
                         isSearchable
                         defaultValue={bankOptions[0]} 
                         onChange={(selectedOption) => onChange(selectedOption?.value)} 
                         
                        />

            

                    </Form.InputWrapper>

                )}

                />

                <Controller
                control={control}
                name="agency"
                render={({field:{onChange, value}})=> (

                <Form.InputWrapper>
                    
                    <Input.Root>
                        
                        <Input.Label 
                        className="text-gray-neutral-400"
                        content="Agência"
                        htmlFor="agency"
                        />
                        <Input.System
                        placeholder={'1234'}
                        id="agency"
                        type="number"
                        onChange={onChange}
                        value={value}
                        readOnly={isReadonly}
                        />


                    </Input.Root>

                </Form.InputWrapper>



                )}
                />
                

                <Controller
                
                name="pixkey"
                render={({field:{onChange, value}})=> (

                <Form.InputWrapper >

                            <Input.Root>
                                
                                <Input.Label 
                                className="text-gray-neutral-400"
                                content="Chave pix"
                                htmlFor="pixkey"
                                />
                                <Input.System
                                placeholder={'1111111'}
                                id="pixkey"
                                onChange={onChange}
                                value={value}
                                readOnly={isReadonly}
                                />


                            </Input.Root>

                </Form.InputWrapper>


                )}
                />

    
                
            </Form.Group>

                {!isReadonly &&

                    <Button.Root type="submit" className="mt-4 w-full">
                        <Button.Wrapper>
                            <Button.Content content="Confirmar" />
                        </Button.Wrapper>
                    </Button.Root>
                
                }

            </form>




    );
}