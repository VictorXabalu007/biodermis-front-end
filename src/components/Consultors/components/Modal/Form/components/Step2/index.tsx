import { Form } from "../../../../../../shared/Form";
import { Input } from "../../../../../../shared/Input/Input";
import { GrLocation } from "react-icons/gr";


export const FormStep2 = () => {

    
    return (

        <form>

            <div>

                <Input.Root>
                
                    <Input.Label 
                    className="text-gray-neutral-400"
                    content="Endereço"
                    htmlFor="address"
                    />
                    <Input.System
                    className="py-2"
                    icon={<GrLocation className="text-brand-purple" />}
                    placeholder={'Endereço'}
                    id="address"
                    />
                

                </Input.Root>

            </div>

            <Form.Group>

     
             <Form.InputWrapper>
                <Input.Root>
                    
                    <Input.Label 
                    className="text-gray-neutral-400"
                    content="CEP"
                    htmlFor="cep"
                    />
                    <Input.System
                    placeholder={'123513-632'}
                    id="cep"
                    />
                

                </Input.Root>
                
                </Form.InputWrapper>   

                <Form.InputWrapper>

                        <Input.Root>
                            
                            <Input.Label 
                            className="text-gray-neutral-400"
                            content="Número"
                            htmlFor="number"
                            />
                            <Input.System
                            placeholder={'123'}
                            id="address"
                            />
                        

                        </Input.Root>

                </Form.InputWrapper>


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
                            />
                        

                        </Input.Root>


                </Form.InputWrapper>
                
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
                            />
                        

                        </Input.Root>


                </Form.InputWrapper>


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
                        />
                    

                    </Input.Root>


                    </Form.InputWrapper>

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
                            />
                        

                        </Input.Root>

                    </Form.InputWrapper>




            </Form.Group>


         
        </form>

    );
}