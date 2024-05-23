import { ElementType } from "react";

import { HiMiniPencilSquare } from "react-icons/hi2";
import { Heading } from "../../../../../../shared/Heading";
import { Text } from "../../../../../../shared/Text";
import { InputDatePicker } from "../../../../../../shared/Input/DatePicker";
import { Input } from "../../../../../../shared/Input/Input";
import { Flex } from "antd";
import { Form } from "antd/lib";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalFooter } from "./ModalFooter";


type TitleData = {
    title: string,
    icon? : ElementType,
    label: string,
}

const Footer = ModalFooter;

const data: TitleData[] = [

    {
        title: '2925',
        label: 'Codigo do pedido'
    },
    {
        title: 'SEDEX',
        icon: HiMiniPencilSquare,
        label: 'Forma de envio'
    },
    {
        title: 'R$ 30,00',
        label: 'Valor do frete'
    },

]

type RequestEditorProps = {
    handleClose: () => void
}

export const RequestEditor = ({handleClose}:RequestEditorProps) => {


    const sendSchema = z.object({
        sendDate: z.string({required_error: 'Data de envio é obrigatória'})
        .min(1,'A data de validade não pode ser vazia...'),
        sendCode: z.string({required_error: 'Código de envio é obrigatório'})
        .min(1,'O código de envio não pode ser vazio...'),
    })


    type SendData = z.infer<typeof sendSchema>


    const [form] = Form.useForm();

    const {handleSubmit,control, formState:{errors}} = useForm<SendData>({
        resolver: zodResolver(sendSchema),
        criteriaMode: 'all',
        mode: 'all'
    });



    const onSubmit = (data:SendData) => {

        console.log(data);
        handleClose();
        
    }

    return (

        <Form 
            form={form} 
            className="flex justify-between min-h-screen flex-col"
        >


            <div className="px-4">

                <Flex className="flex-col">
                    <div className="mb-10">

                    <Heading.Root>
                        <Heading.Content content="Adicionar código de envio" />
                    </Heading.Root>

                    </div>

                    <Flex className="w-full px-10" gap={10} justify="space-between">

                        {data.map((item,index) => {
                            
                            return(

                                <div key={index} className="flex items-center flex-col">

                                    <Heading.Root>
                                        {item.title}
                                        {item.icon && <Heading.Icon className="text-brand-purple" icon={item.icon} />}
                                    </Heading.Root>

                                    <Text.Root className="text-gray-neutral-950 my-3">
                                        <Text.Content content={item.label} />
                                    </Text.Root>

                                </div>

                            )
                        })}

                    </Flex>
                </Flex>


                <div className="my-3">

                    <div className="my-3">
                        <Text.Root className="text-gray-neutral-600 my-2 font-[600] ">
                            <Text.Content content="Data de envio" />
                        </Text.Root>

                        <Controller 
                        control={control}
                        name="sendDate"
                        render={({field:{onChange}}) => (

                            <Form.Item
                                name="sendDate"
                                validateStatus={errors.sendDate ? 'error' : 'success'}
                                help={errors.sendDate && errors.sendDate.message}
                                hasFeedback
                            >

                                    <InputDatePicker 
                                    onChange={(_,dateString)=> (
                                        onChange(dateString)
                                    )}
                                />

                            </Form.Item>


                        )}
                        
                        />
                    </div>

                    <div className="my-3">


                        <Controller 
                           name="sendCode"
                           control={control}
                           render={({field:{onChange}})=>(

                            <Form.Item 
                                name="sendCode"
                                validateStatus={errors.sendCode ? 'error' : 'success'}
                                help={errors.sendCode && errors.sendCode.message}
                                hasFeedback
                            >

                                <Input.Root className="my-2">

                                    <Input.Label 
                                    content="Código de envio"
                                    htmlFor="sendCode" 
                                    className="text-gray-neutral-600 font-[600]"
                                    />

                                    <Input.System 
                                    id="sendCode"
                                    className="border-purple-solid-950 placeholder-purple-solid-950 text-sm font-[600]"
                                    placeholder="Código de envio"
                                    onChange={onChange}
                                    />

                                </Input.Root>

                            </Form.Item>

                            )}

                        />
    

                    </div>


                </div>

            </div>




            <Footer.Root>


                <Footer.Actions
                    onClick={handleClose}
                    content="Cancelar"
                    key="cancel"
                
                />

                <Footer.Actions 
                    content="Confirmar"
                    key="ok"
                    onClick={handleSubmit(onSubmit)}
                    className="bg-brand-purple text-white hover:bg-brand-purple/75"
                

                />

              


            </Footer.Root>
           


        </Form>


    );
    
}