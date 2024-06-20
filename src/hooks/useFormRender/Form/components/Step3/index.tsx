

import { Controller, useFormContext } from "react-hook-form";
import { FormType } from "../../../../../@types/FormType/FormType";

import { FormItem } from "../../../../../components/shared/Form/FormItem";
import { Form } from "../../../../../components/shared/Form";
import { Input } from "../../../../../components/shared/Input/Input";
import { Button } from "../../../../../components/shared/Button";
import { UserCredentials } from "../../../../../@types/UserData/UserData";
import { useFieldChange } from "../../../../useFieldChange/useFieldChange";
import { Alert } from "antd";
import { UserRole } from "../../../../../util/UserRole";


export const FormStep3 = ({isReadonly, data, onSubmit}:FormType<UserCredentials>) => {


    const { handleSubmit, control, formState:{errors} } = useFormContext<UserCredentials>();

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
                name="agencia"
                render={({field:{onChange, name}})=> (

                    <FormItem
                    name={name}
                    validateStatus={errors.agencia ? 'error' : 'success'}
                    help={errors.agencia && errors.agencia.message}
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
                                value={fields.agencia}
                                onChange={(e)=> { 
                                    handleChange('agencia',e)
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
                name="pix"
                render={({field:{onChange}})=> (

                    <FormItem
                    name="pix"
                    validateStatus={errors?.pix ? 'error' : 'success'}
                    help={errors?.pix && errors.pix.message}
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

                <Controller
                control={control}
                name="conta"
                render={({field:{onChange}})=> (

                    <FormItem
                    name="conta"
                    validateStatus={errors?.conta ? 'error' : 'success'}
                    help={errors?.conta && errors.conta.message}
                    hasFeedback
                    >

                        <Form.InputWrapper >

                                    <Input.Root>
                                        
                                        <Input.Label 
                                        className="text-gray-neutral-400"
                                        content="Conta"
                                        htmlFor="account"
                                        />
                                        <Input.System
                                        placeholder={'1111111'}
                                        id="account"
                                        onChange={(e)=> { 
                                            handleChange('conta',e)
                                            onChange(e.target.value)
                                        }}
                                        value={fields.conta}
                                        readOnly={isReadonly}
                                        />


                                    </Input.Root>

                        </Form.InputWrapper>


                    </FormItem>



                )}
                />

    
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