
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../../../../../../shared/Input/Input";
import { PatternFormat } from "react-number-format";
import { FormType } from "../../../../../../../@types/FormType/FormType";
import { Flex } from "antd";
import { Button } from "../../../../../../shared/Button";
import { useFieldChange } from "../../../../../../../hooks/useFieldChange/useFieldChange";
import { FormItem } from "../../../../../../shared/Form/FormItem";
import { Form } from "../../../../../../shared/Form";
import { ConsultorsData } from "../../../../../hooks/useTableData";




export const FormStep1 = ({isReadonly, data, onSubmit}:FormType<ConsultorsData>) => {

    const { control, handleSubmit, formState:{errors} } = useFormContext<ConsultorsData>();

    const {
        fields,
        handleChange
    } = useFieldChange<ConsultorsData>({data});
    

    return (
            

        <form onSubmit={handleSubmit(onSubmit)}>

            <Flex gap={10} className="mt-5 flex-col">

                <Controller 
                name="name"
                control={control}
                rules={{required: true}}
                render={({field:{onChange, name}})=> (
                
                    <FormItem
                    name="name"
                    validateStatus={errors.name ? 'error' : 'success'}
                    help={errors.name && errors.name.message}
                    hasFeedback
                    >

                        <Input.Root>
                        
                            <Input.Label 
                            className="text-gray-neutral-400"
                            content="Nome"
                            htmlFor="name"
                            />
                            <Input.System
                            placeholder={'name...'}
                            id="name"
                            onChange={(e)=> {
                                handleChange(name,e)
                                onChange(e.target.value)
                            }}
                            value={fields.name}
                            readOnly={isReadonly}
                            />

                        </Input.Root>

                    </FormItem>

                )}
                />


            <Flex justify="space-between" gap={10}>

                <Controller 
                name="cpf"
                control={control}
                rules={{required: true}}
                render={({field:{onChange, name}})=> (

                    <FormItem
                    className="w-full"
                    name="cpf"
                    validateStatus={errors.cpf ? 'error' : 'success'}
                    help={errors.cpf && errors.cpf.message}
                    hasFeedback
                    >

                        <Form.InputWrapper>

                            <Input.Root className="w-full">
                                
                                <Input.Label 
                                className="text-gray-neutral-400"
                                content="CPF"
                                htmlFor="cpf"
                                />

                                <PatternFormat

                                format="###.###.###-##" 
                                allowEmptyFormatting 
                                mask="_" 
                                className="rounded-md py-2 px-2 border border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
                                onChange={(e)=> {
                                    handleChange(name,e);
                                    onChange(e.target.value);
                                }}
                                value={fields.cpf}
                                readOnly={isReadonly}
                                
                                
                                />

                            </Input.Root>


                        </Form.InputWrapper>




                    </FormItem>

                )}
                
                />

                <Controller 
                rules={{required: true}}
                control={control}
                name="phone"
                render={({field:{onChange, name}})=> (

                    <FormItem
                    className="w-full"
                    name="phone"
                    validateStatus={errors.phone ? 'error' : 'success'}
                    help={errors.phone && errors.phone.message}
                    hasFeedback
                    >
                        <Form.InputWrapper>

                            <Input.Root  className="w-full">
                                
                                <Input.Label 
                                className="text-gray-neutral-400"
                                content="Telefone"
                                htmlFor="phone"
                                />

                                <PatternFormat

                                format="(##) #####-####" 
                                allowEmptyFormatting 
                                mask="_" 
                                className="rounded-md py-2 px-2 border border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
                                value={fields.phone}
                                readOnly={isReadonly}
                                onChange={(e)=> {
                                    handleChange(name,e);
                                    onChange(e.target.value);
                                }}


                                />

                            </Input.Root>



                        </Form.InputWrapper>



                    </FormItem>


                )}
                
                />

            </Flex>

 
                
                <Controller 
                rules={{required: true}}
                name="email"
                render={({field:{onChange, name}})=> (

                    <FormItem
                    name="email"
                    validateStatus={errors.email ? 'error' : 'success'}
                    help={errors.email && errors.email.message}
                    hasFeedback
                    >

                    <Input.Root>

                        <Input.Label 
                        className="text-gray-neutral-400"
                        content="E-mail"
                        htmlFor="email"
                        />

                        <Input.System
                        type="email"
                        placeholder={'email...'}
                        id="email"
                        value={fields.email}
                        readOnly={isReadonly}
                        onChange={(e)=> {
                            handleChange(name,e);
                            onChange(e.target.value);
                        }}

                        />

                    </Input.Root>



                    </FormItem>


                    )}
                />
                
            </Flex>



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