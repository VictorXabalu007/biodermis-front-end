import { Controller, useFormContext } from "react-hook-form";
import { Form } from "../../../../../../shared/Form";
import { Input } from "../../../../../../shared/Input/Input";
import { GrLocation } from "react-icons/gr";
import { PatternFormat } from "react-number-format";
import { FormType } from "../../../../@types/FormType";
import { Button } from "../../../../../../shared/Button";


export const FormStep2 = ({isReadonly}:FormType) => {

    const { control } = useFormContext();

    return (

        <div>

                <Controller
                control={control}
                name="address"
                render={({field:{onChange, value}})=> (

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
                        onChange={onChange}
                        value={value}
                        readOnly={isReadonly}
                        />
                    

                    </Input.Root>

                )}
                
                />

            <Form.Group>

             <Controller 
             control={control}
             name="cep"
             render={({field:{onChange, value}})=> (

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
                name="number"
                render={({field:{onChange,value}})=> (

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
                name="street"
                render={({field:{onChange,value}})=> (

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
                name="complement"
                render={({field:{onChange, value}})=> (

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
                name="neighborhood"
                render={({field:{onChange, value}})=> (

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
                        onChange={onChange}
                        value={value}
                        readOnly={isReadonly}

                        />
                    

                    </Input.Root>


                    </Form.InputWrapper>


                )}
                />

                <Controller 
                name="city"
                render={({field:{onChange, value}})=> (

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


         
        </div>

    );
}