import { Controller, useFormContext } from "react-hook-form";

import { GrLocation } from "react-icons/gr";
import { PatternFormat } from "react-number-format";
import { useFieldChange } from "../../../../useFieldChange/useFieldChange";
import FormItem from "antd/es/form/FormItem";
import { Input } from "../../../../../components/shared/Input/Input";
import { Form } from "../../../../../components/shared/Form";
import { Button } from "../../../../../components/shared/Button";
import { FormType } from "../../../../../@types/FormType/FormType";
import { UserCredentials } from "../../../../../@types/UserData/UserData";
import { Alert } from "antd";
import { UserRole } from "../../../../../util/UserRole";


export const FormStep2 = ({
    isReadonly,
    onSubmit,
    data}:FormType<UserCredentials>) => {

    const { control, handleSubmit, formState:{errors} } = useFormContext<UserCredentials>();

    const {
        fields,
        handleChange
    } = useFieldChange<UserCredentials>({data});

    return (

        <form onSubmit={handleSubmit(onSubmit)}>

                {data.cargo_id === UserRole.USER &&
                        
                        <Alert
                        className="my-3"
                        type="warning"
                        message="Não é possível editar dados de um cliente"
                        />
                    
                    }

                <Controller
                control={control}
                name="estado"
                rules={{required: true}}
                render={({field:{onChange,name}})=> (

                    <FormItem
                    name={name}
                    validateStatus={errors.estado ? 'error' : 'success'}
                    help={errors.estado && errors.estado.message}
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
                            value={fields.estado}
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
                name={name}
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
                name="numero"
                rules={{required: true}}
                render={({field:{onChange, name}})=> (

                    <FormItem
                    name={name}
                    validateStatus={errors.numero ? 'error' : 'success'}
                    help={errors.numero && errors.numero.message}
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
                                value={fields.numero}
                                />
                            

                            </Input.Root>

                    </Form.InputWrapper>



                    </FormItem>


                    )}
                />


            <Controller 
                control={control}
                name="rua"
                rules={{required:true}}
                render={({field:{onChange, name}})=> (

                    <FormItem
                    name={name}
                    validateStatus={errors.rua ? 'error' : 'success'}
                    help={errors.rua && errors.rua.message}
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
                                    value={fields.rua}
                                    />
                                

                                </Input.Root>

                        </Form.InputWrapper>

                    </FormItem>


                    )}
                />



                <Controller 
                control={control}
                name="bairro"
                rules={{required:true}}
                render={({field:{onChange,name}})=> (

                    <FormItem
                    name={name}
                    validateStatus={errors.bairro ? 'error' : 'success'}
                    help={errors.bairro && errors.bairro.message}
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
                                value={fields.bairro}

                                />
                            

                            </Input.Root>


                            </Form.InputWrapper>

                        
                    </FormItem>



                )}
                />

                <Controller 
                name="cidade"
                control={control}
                rules={{required:true}}
                render={({field:{onChange,name}})=> (

                    <FormItem
                    name={name}
                    validateStatus={errors.cidade ? 'error' : 'success'}
                    help={errors.cidade && errors.cidade.message}
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
                                value={fields.cidade}
                                


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