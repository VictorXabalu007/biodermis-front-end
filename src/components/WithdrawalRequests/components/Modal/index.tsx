
import { Form } from "../../../shared/Form";
import { UserImage } from "../../../shared/Image/UserImage";
import { Input } from "../../../shared/Input/Input";
import InputMoney from "../../../shared/Input/InputNumber";
import { Typography } from "antd";
import { FaCheck } from "react-icons/fa6";
import { IoCopyOutline } from "react-icons/io5";

const { Paragraph } = Typography;

export const WithDrawalModal = () => {

    return (


        <>

        <UserImage 
        className="my-2"
        />

        <form>

            <div>

                <Input.Root>
                
                    <Input.Label 
                    className="text-gray-neutral-400"
                    content="Nome"
                    htmlFor="name"
                    />
                    <Input.System
                    className="py-2"
                    value={"Leonardo"}
                    id="name"
                    readOnly
                    />
                

                </Input.Root>

            </div>

            <Form.Group>

     
             <Form.InputWrapper>

                <Input.Root>
                    
                    <Input.Label 
                    className="text-gray-neutral-400"
                    content="Chave Pix"
                    htmlFor="pixkey"
                    />
                    <Input.System
                    value={'12121212'}
                    className="border-brand-purple"
                    id="pixkey"
                    readOnly
                    />

                <Paragraph
                    className="text-brand-purple"
                    copyable={{
                        icon: [
                        <IoCopyOutline className="text-brand-purple"
                        key={"copy-icon"}
                        />,
                        
                        <FaCheck key="copied-icon" />],
                        tooltips: ['Copiar', 'Chave copiada'],
                        text: '12121212',
                        
                    }}
                    >

                    Copiar chave pix
                </Paragraph>
                    
                

                </Input.Root>
                
            </Form.InputWrapper>   

                <Form.InputWrapper>

                        <Input.Root>
                            
                            <Input.Label 
                            className="text-gray-neutral-400"
                            content="Valor solicitado"
                            htmlFor="solicitedValue"
                            />
                            
                            <InputMoney 
                            className="rounded-md py-2 px-2 border border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
                            onChange={()=>null}
                            value={1500}
                            prefix={"R$"}
                            id="solicitedValue"
                            readOnly
                            />
                        

                        </Input.Root>

                </Form.InputWrapper>


                <Form.InputWrapper>

                        <Input.Root>
                            
                            <Input.Label 
                            className="text-gray-neutral-400"
                            content="Banco"
                            htmlFor="bank"
                            />
                            <Input.System
                            value={"CAIXA"}
                            id="bank"
                            readOnly
                            />
                        

                        </Input.Root>


                </Form.InputWrapper>
                
                <Form.InputWrapper>

                        <Input.Root>
                            
                            <Input.Label 
                            className="text-gray-neutral-400"
                            content="Agência"
                            htmlFor="agency"
                            />
                            <Input.System
                            value={"1234"}
                            id="agency"
                            readOnly
                            />
                        

                        </Input.Root>


                </Form.InputWrapper>


            </Form.Group>

            <div className="mt-2">

                <Input.Root>

                    <Input.Label 
                    className="text-gray-neutral-400"
                    content="Conta"
                    htmlFor="account"
                    />
                    <Input.System
                    className="py-2"
                    value={"Leonardo"}
                    id="account"
                    readOnly
                    />


                </Input.Root>

           </div>


         
        </form>
        
        
        </>


    );


}