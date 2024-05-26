
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
import { useFieldChange } from "../../../../../../../hooks/useFieldChange/useFieldChange";
import { BankData } from "../../../../../../Register/RegisterConsultor/components/FormContainer";
import { FormItem } from "../../../../../../shared/Form/FormItem";
import { ConsultorsData } from "../../../../../hooks/useTableData";

export const FormStep3 = ({isReadonly, data, onSubmit}:FormType<ConsultorsData>) => {


    const { handleSubmit, control, formState:{errors} } = useFormContext<ConsultorsData>();

    const {
        fields,
        handleChange
        //@ts-ignore
    } = useFieldChange<BankData>({data: data.bankData});


    return (

        <form onSubmit={handleSubmit(onSubmit)}>

                <Controller 
                control={control}
                name="bankData.cardNumber"
                rules={{required:true}}
                render={({field:{onChange}})=> (
                    

                    <FormItem
                    name="cardNumber"
                    validateStatus={errors.bankData?.cardNumber ? 'error' : 'success'}
                    help={errors.bankData?.cardNumber && errors.bankData.cardNumber.message}
                    hasFeedback
                    >

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
                            mask="_"
                            value={fields.cardNumber}
                            onChange={(e)=> { 
                                handleChange('cardNumber',e)
                                onChange(e.target.value)
                            }}

                            readOnly={isReadonly}
                            
                            
                            />
        
                            </Input.Root>

                        </Form.InputWrapper>



                    </FormItem>
                    


                )}
                />

            
            <Form.Group>

                <Controller
                control={control}
                name="bankData.cvv"
                rules={{required: true}}
                render={({field:{onChange}})=> (

                    <FormItem
                    name="cvv"
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
                            id="cvv"
                            type="number"
                            maxLength={3}
                            value={fields.cvv}
                            onChange={(e)=> { 
                                handleChange('cvv',e)
                                onChange(e.target.value)
                            }}
                            readOnly = {isReadonly}
                            />


                            </Input.Root>

                        </Form.InputWrapper>



                    </FormItem>
                )}
                
                />

                
                <Controller
                control={control}
                name="bankData.expireDate"
                render={({field:{onChange}})=> (

                    <FormItem
                    name="expireDate"
                    validateStatus={errors.bankData?.expireDate ? 'error' : 'success'}
                    help={errors.bankData?.expireDate && errors.bankData.expireDate.message}
                    hasFeedback
                    >

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
                                            //@ts-ignore
                                            handleChange('expireDate',dateString)
                                            onChange(dateString)

                                        }}
                                        defaultValue={dayjs(new Date())}
                                        value={dayjs(fields.expireDate, "MM/YYYY")}
                                        format={"MM/YYYY"}
                                        readOnly={isReadonly}
                                        
                                        />


                                </DatePickerWrapper>


                            </Input.Root>

                        </Form.InputWrapper>

                    </FormItem>


                )}
                />

                    <Controller 
                    control={control}
                    name="bankData.titularName"
                    render={({field:{onChange}})=> (

                        <FormItem
                        name="titularName"
                        validateStatus={errors.bankData?.titularName ? 'error' : 'success'}
                        help={errors.bankData?.titularName && errors.bankData.titularName.message}
                        hasFeedback
                        >

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
                                    onChange={(e)=> { 
                                        handleChange('titularName',e)
                                        onChange(e.target.value)
                                    }}
                                    value={fields.titularName}
                                    readOnly={isReadonly}
                                    
                                    />


                                </Input.Root>


                            </Form.InputWrapper>



                        </FormItem>



                    )}
                    />
                    
                <Controller 
                control={control}
                name="bankData.bank"
                render={({field:{onChange}})=> (

                    <FormItem
                    name="bank"
                    validateStatus={errors.bankData?.bank ? 'error' : 'success'}
                    help={errors.bankData?.bank && errors.bankData.bank.message}
                    hasFeedback
                    >

                        <Form.InputWrapper>

                            <Input.Label 
                                className="text-gray-neutral-400 m-0"
                                content="Banco"
                                htmlFor="bank"
                            />

                        
                            <Select
                            options={bankOptions}
                            isSearchable
                            defaultValue={bankOptions.find( op => op.value === fields.bank)} 
                            onChange={(selectedOption) => {
                                handleChange('bank', selectedOption!.value)
                                onChange(selectedOption?.value)
                            }}
                            
                            
                            />

                

                        </Form.InputWrapper>


                    </FormItem>


                )}

                />

                <Controller
                control={control}
                name="bankData.agency"
                render={({field:{onChange}})=> (

                    <FormItem
                    name="agency"
                    validateStatus={errors.bankData?.agency ? 'error' : 'success'}
                    help={errors.bankData?.agency && errors.bankData.agency.message}
                    hasFeedback
                    >

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
                                value={fields.agency}
                                onChange={(e)=> { 
                                    handleChange('agency',e)
                                    onChange(e.target.value)
                                }}
                                readOnly={isReadonly}
                                />


                            </Input.Root>

                        </Form.InputWrapper>


                    </FormItem>




                )}
                />
                

                <Controller
                control={control}
                name="bankData.pix"
                render={({field:{onChange}})=> (

                    <FormItem
                    name="pix"
                    validateStatus={errors.bankData?.pix ? 'error' : 'success'}
                    help={errors.bankData?.pix && errors.bankData.pix.message}
                    hasFeedback
                    >

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
                                        onChange={(e)=> { 
                                            handleChange('pix',e)
                                            onChange(e.target.value)
                                        }}
                                        value={fields.pix}
                                        readOnly={isReadonly}
                                        />


                                    </Input.Root>

                        </Form.InputWrapper>


                    </FormItem>



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