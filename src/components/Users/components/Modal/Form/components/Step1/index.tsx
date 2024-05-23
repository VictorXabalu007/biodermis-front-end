
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../../../../../../shared/Input/Input";
import { PatternFormat } from "react-number-format";

import { Flex } from "antd";
import { Button } from "../../../../../../shared/Button";
import { FormType } from "../../../../../../../@types/FormType/FormType";


export const FormStep1 = ({isReadonly}:FormType) => {

    const { control } = useFormContext();

    return (
            

        <div>

            <Flex gap={10} className="mt-5 flex-col">

                <Controller 
                name="name"
                control={control}
                render={({field:{onChange, value}})=> (

                <Input.Root>
                
                    <Input.Label 
                    className="text-gray-neutral-400"
                    content="Nome"
                    htmlFor="name"
                    />
                    <Input.System
                    placeholder={'name...'}
                    id="name"
                    onChange={onChange}
                    value={value}
                    onBlur={() => console.log(value)}
                    readOnly={isReadonly}
                    />

                </Input.Root>

                )}
                />


            <Flex gap={10}>

                <Controller 
                name="cpf"
                control={control}
                render={({field:{onChange, value}})=> (

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
                        onChange={onChange}
                        value={value}
                        readOnly={isReadonly}
                        
                        
                        />

                    </Input.Root>

                )}
                
                />

                <Controller 
                control={control}
                name="phone"
                render={({field:{onChange, value}})=> (

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
                        onChange={onChange}
                        value={value}
                        readOnly={isReadonly}


                        />

                    </Input.Root>

                )}
                
                />

            </Flex>

 
                
                <Controller 
                
                name="email"
                render={({field:{value, onChange}})=> (

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
                        onChange={onChange}
                        value={value}
                        readOnly={isReadonly}

                        />

                    </Input.Root>

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


        </div>

    );

}