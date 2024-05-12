
import { Input } from "../../../../../../shared/Input/Input";
import { LiaCreditCard } from "react-icons/lia";
import { Select } from "../../../../../../shared/Input/Select";
import { Button } from "../../../../../../shared/Button";
import { Form } from "../../../../../../shared/Form";



export const FormStep3 = () => {

    
    return (

        <form>
                <Form.InputWrapper>

                    <Input.Root>
                    
                        <Input.Label 
                        className="text-gray-neutral-400"
                        content="Número do cartão"
                        htmlFor="cardNumber"
                        />

                        <Input.System
                        className="py-2"
                        icon={<LiaCreditCard  className="fill-brand-purple" />}
                        placeholder={'Número do cartão'}
                        id="cardNumber"
                        />

                    </Input.Root>

                </Form.InputWrapper>
            
            <Form.Group>


                <Form.InputWrapper>

                    <Input.Root>
                        
                        <Input.Label 
                        className="text-gray-neutral-400"
                        content="CVV"
                        htmlFor="cvv"
                        />
                        <Input.System
                        placeholder={'123'}
                        id="vcc"
                        type="number"
                        maxLength={3}
                        />


                    </Input.Root>

                </Form.InputWrapper>


                <Form.InputWrapper>

                    <Input.Root>
                        
                        <Input.Label 
                        className="text-gray-neutral-400"
                        content="Data de validade"
                        htmlFor="expirationDate"
                        />

                        <Input.System
                        placeholder={'123'}
                        id="expirationDate"
                        />



                    </Input.Root>

                </Form.InputWrapper>

           
                    <Form.InputWrapper>

                        <Input.Root>
                            
                            <Input.Label 
                            className="text-gray-neutral-400"
                            content="Nome no cartão"
                            htmlFor="titularName"
                            />
                            <Input.System
                            placeholder={'ex: Gustavo Henrique'}
                            id="titularName"
                            
                            />


                        </Input.Root>


                    </Form.InputWrapper>
                    
                <Form.InputWrapper>

            
                    
                    <Input.Label 
                        className="text-gray-neutral-400 m-0"
                        content="Banco"
                        htmlFor="bank"
                    />

                    <Select.System
                    className="w-full h-[42px]"
                    options={[]}
                    defaultValue="Caixa"
                    id="bank"
                    />

          

                </Form.InputWrapper>

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
                        />


                    </Input.Root>

                </Form.InputWrapper>
                
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
                                />


                            </Input.Root>

                </Form.InputWrapper>

            
                
            </Form.Group>

                <Button.Root type="submit" className="mt-4 w-full">
                    <Button.Wrapper>
                        <Button.Content content="Confirmar" />
                    </Button.Wrapper>
                </Button.Root>

            </form>




    );
}