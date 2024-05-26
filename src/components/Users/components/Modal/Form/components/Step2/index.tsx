import { Controller, useFormContext } from "react-hook-form";
import { Form } from "../../../../../../shared/Form";
import { Input } from "../../../../../../shared/Input/Input";
import { GrLocation } from "react-icons/gr";
import { PatternFormat } from "react-number-format";
import { FormType } from "../../../../../../../@types/FormType/FormType";
import { Button } from "../../../../../../shared/Button";
import { useFieldChange } from "../../../../../../../hooks/useFieldChange/useFieldChange";
import { FormItem } from "../../../../../../shared/Form/FormItem";
import { UserData } from "../../../../../../Register/RegisterConsultor/components/FormContainer";


export const FormStep2 = ({
    isReadonly,
    onSubmit,
    data}:FormType<UserData>) => {

    const { control, handleSubmit, formState:{errors} } = useFormContext<UserData>();

    const {
        fields,
        handleChange
    } = useFieldChange<UserData>({data});

    return (

        <form onSubmit={handleSubmit(onSubmit)}>

                <Controller
                control={control}
                name="address"
                rules={{required: true}}
                render={({field:{onChange,name}})=> (

                    <FormItem
                    name="address"
                    validateStatus={errors.address ? 'error' : 'success'}
                    help={errors.address && errors.address.message}
                    hasFeedback
                    >

                        <Input.Root>
                        
                            <Input.Label 
                            className="text-gray-neutral-400"
                            content="Endereço"
                            htmlFor="address"
                            />
                            <Input.System
                            className="py-2"
                            suffix={<GrLocation className="text-brand-purple" />}
                            placeholder={'Endereço'}
                            id="address"
                            onChange={(e)=> {
                                handleChange(name,e)
                                onChange(e.target.value)
                            }}
                            value={fields.address}
                            readOnly={isReadonly}
                            />
                        

                        </Input.Root>


                    </FormItem>


                )}
                
                />

            <Form.Group className="gap-2">

             <Controller 
             control={control}
             name="cep"
             rules={{required: true}}
             render={({field:{onChange, name}})=> (

                <FormItem
                name="cep"
                validateStatus={errors.cep ? 'error' : 'success'}
                help={errors.cep && errors.cep.message}
                hasFeedback
                >

                <Form.InputWrapper>
                    <Input.Root>
                        <Input.Label 
                        className="text-gray-neutral-400"
                        content="CEP"
                        htmlFor="cep"
                        />
                        <PatternFormat
                            format="#####-###"
                            allowEmptyFormatting
                            mask="_"
                            className="rounded-md py-2 px-2 border border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
                   
                            readOnly={isReadonly}
                            onChange={(e)=> {
                                handleChange(name,e)
                                onChange(e.target.value)
                            }}
                            value={fields.cep}
                        />
                    

                    </Input.Root>
                    
                    </Form.InputWrapper>   


                </FormItem>


             )}

             />
                
                <Controller 
                control={control}
                name="number"
                rules={{required: true}}
                render={({field:{onChange, name}})=> (

                    <FormItem
                    name="number"
                    validateStatus={errors.number ? 'error' : 'success'}
                    help={errors.number && errors.number.message}
                    hasFeedback
                    >

                    <Form.InputWrapper>

                            <Input.Root>
                                
                                <Input.Label 
                                className="text-gray-neutral-400"
                                content="Número"
                                htmlFor="number"
                                />
                                <Input.System
                                placeholder={'123'}
                                id="number"
                                readOnly={isReadonly}
                                onChange={(e)=> {
                                    handleChange(name,e)
                                    onChange(e.target.value)
                                }}
                                value={fields.number}
                                />
                            

                            </Input.Root>

                    </Form.InputWrapper>



                    </FormItem>


                    )}
                />


            <Controller 
                control={control}
                name="street"
                rules={{required:true}}
                render={({field:{onChange, name}})=> (

                    <FormItem
                    name="street"
                    validateStatus={errors.street ? 'error' : 'success'}
                    help={errors.street && errors.street.message}
                    hasFeedback
                    >

                        <Form.InputWrapper>

                                <Input.Root>
                                    
                                    <Input.Label 
                                    className="text-gray-neutral-400"
                                    content="Rua"
                                    htmlFor="street"
                                    />
                                    <Input.System
                                    placeholder={'Rua do usuário'}
                                    id="street"
                                    readOnly={isReadonly}
                                    onChange={(e)=> {
                                        handleChange(name,e)
                                        onChange(e.target.value)
                                    }}
                                    value={fields.street}
                                    />
                                

                                </Input.Root>

                        </Form.InputWrapper>

                    </FormItem>


                    )}
                />

                <Controller 
                control={control}
                rules={{required:true}}
                name="complement"
                render={({field:{onChange, name}})=> (

                    <FormItem
                    name="complement"
                    validateStatus={errors.complement ? 'error' : 'success'}
                    help={errors.complement && errors.complement.message}
                    hasFeedback
                    >

                        <Form.InputWrapper>

                                <Input.Root>
                                    
                                    <Input.Label 
                                    className="text-gray-neutral-400"
                                    content="Complemento"
                                    htmlFor="complement"
                                    />
                                    <Input.System
                                    placeholder={'Complemento'}
                                    id="complement"
                                    readOnly={isReadonly}
                                    onChange={(e)=> {
                                        handleChange(name,e)
                                        onChange(e.target.value)
                                    }}
                                    value={fields.complement}
                                    
                                    />
                                

                                </Input.Root>


                        </Form.InputWrapper>


                    </FormItem>

                )}
                />
                

                <Controller 
                control={control}
                name="neighborhood"
                rules={{required:true}}
                render={({field:{onChange,name}})=> (

                    <FormItem
                    name="neighborhood"
                    validateStatus={errors.neighborhood ? 'error' : 'success'}
                    help={errors.neighborhood && errors.neighborhood.message}
                    hasFeedback
                    >

                        <Form.InputWrapper>

                                
                            <Input.Root>
                                
                                <Input.Label 
                                className="text-gray-neutral-400"
                                content="Bairro"
                                htmlFor="neighborhood"
                                />
                                <Input.System
                                placeholder={'bairro'}
                                id="neighborhood"
                                readOnly={isReadonly}
                                onChange={(e)=> {
                                    handleChange(name,e)
                                    onChange(e.target.value)
                                }}
                                value={fields.neighborhood}

                                />
                            

                            </Input.Root>


                            </Form.InputWrapper>

                        
                    </FormItem>



                )}
                />

                <Controller 
                name="city"
                control={control}
                rules={{required:true}}
                render={({field:{onChange,name}})=> (

                    <FormItem
                    name="city"
                    validateStatus={errors.city ? 'error' : 'success'}
                    help={errors.city && errors.city.message}
                    hasFeedback
                    >

                        <Form.InputWrapper>

                            <Input.Root>
                                
                                <Input.Label 
                                className="text-gray-neutral-400"
                                content="Cidade"
                                htmlFor="city"
                                />
                                <Input.System
                                placeholder={'São Paulo SP'}
                                id="city"
                                readOnly={isReadonly}
                                onChange={(e)=> {
                                    handleChange(name,e)
                                    onChange(e.target.value)
                                }}
                                value={fields.city}
                                


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