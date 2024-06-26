

import { Button } from "../../../shared/Button";

import { UserImage } from "../../../shared/Image/UserImage";
import { Input } from "../../../shared/Input/Input";
import InputMoney from "../../../shared/Input/InputNumber";
import { Alert, Form as AntdForm, Typography, Upload, message } from "antd";
import { FaCheck } from "react-icons/fa6";
import { IoCopyOutline } from "react-icons/io5";
import { UploadProps } from "antd/lib";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../../shared/Form";
import FormItem from "antd/es/form/FormItem";
import { DraggerWrapper } from "../../../Register/RegisterConsultor/components/FormContainer/components/Uploader/styles/styles";
import { useState } from "react";
import { WithDrawal } from "../../util/withdrawalData";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../../service/connection";
import { getHeaders } from "../../../../service/getHeaders";
import { useConsultorData } from "../../../Consultors/hooks/useConsultorData";

const { Paragraph } = Typography;
const { Dragger } = Upload;


const props: UploadProps = {
  name: 'file',
  multiple: true,
  accept: '.pdf',
  beforeUpload() {
    return false
  }
};

type WithDrawalModalProps  = {
    handleClose: () => void;
    withdraw: WithDrawal
}

export const WithDrawalModal = ({handleClose, withdraw}:WithDrawalModalProps) => {

    const proofSchema = z.object({
        pixProof: z.instanceof(File).refine(file => file.name !== '',{message: 'Comprovante é necessário para o envio!'}),
    }).refine(d => d.pixProof !== null, {message: 'Comprovante é necessário para o envio!'});

    type Data = z.infer<typeof proofSchema>;

    const {handleSubmit, control, formState: {errors}} = useForm<Data>({
        resolver: zodResolver(proofSchema),
        criteriaMode: 'all',
        mode: 'all'
    });

    const [finish, setFinish] = useState({
        success: false,
        isFinished: false,
        errorMsg: '',
    })

    const mutation = useMutation({
        mutationFn:async (data:Data)=> {

            const headers = getHeaders();

            const formData = new FormData();
            
            formData.append('file',data.pixProof as File)

            const req = await api.post(`/saques/comprovante/${withdraw.id}`,{...data},{
                headers
            })

            return req.data
        },
        onSuccess : ()=> {
            setFinish({
                ...finish,
                isFinished: true,
                success: true
            })
            setTimeout(()=> {
    
                setFinish({
                    ...finish,
                    isFinished: false,
                    success: false
                })
                handleClose();
    
            },3000);
            
        },
        onError: (err:any) => {

            setFinish({
                success: false,
                isFinished: true,
                errorMsg: err.response.data.error
            })
            
        }
    })

    const onSubmit = (data:Data) => {

        mutation.mutate(data);
           

    }

   const {getConsultorImageById} = useConsultorData();

    const [form] = AntdForm.useForm();

    return (


        <div>

        <UserImage 
        className="my-2"
        image={getConsultorImageById(withdraw.consultor_id)}
        />


        {finish.isFinished && finish.success &&
        
            <Alert className="my-2" message="Pagamento realizado com sucesso" type="success" />
            
        
        }

        {finish.isFinished && !finish.success &&
        
            <Alert className="my-2" message={finish.errorMsg} type="error" />
            
        }

        <AntdForm form={form} onFinish={handleSubmit(onSubmit)}>

            <div>

                <Input.Root>
                
                    <Input.Label 
                    className="text-gray-neutral-400"
                    content="Nome"
                    htmlFor="name"
                    />
                    <Input.System
                    className="py-2"
                    value={withdraw.nome_consultor}
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
                            value={parseFloat(withdraw.valorsaque)}
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


                    <div className="my-5">


                        <Controller 
                        control={control}
                        name="pixProof"
                        render={({field:{onChange}})=> (

                            
                        <FormItem
                        name="pixProof"
                        validateStatus={errors.pixProof ? 'error' : 'success'}
                        help={errors.pixProof && errors.pixProof.message}
                        hasFeedback
                        >   

                        <DraggerWrapper>


                            <Dragger 

                            style={{
                                                        
                                background: '#FAF3F8',
                                borderColor: '#B475A5',
                                padding: '1rem'
                            }}
                            
                            onChange={(info)=> {
                                const { status } = info.file;
                                if (status !== 'uploading') {
                                }
                                if (status === 'done') {
                                message.success(`${info.file.name} file uploaded successfully.`);
                                } else if (status === 'error') {
                                message.error(`${info.file.name} file upload failed.`);
                                }
                                onChange(info.file)
                            }}

                            {...props}
                            
                            >
                                <p className="ant-upload-drag-icon">
                                
                                </p>
                                <p className="ant-upload-text">
                                    Faça o upload do comprovante do pagamento
                                </p>
                                <p className="ant-upload-hint">
                                    Clique ou arraste o arquivo aqui
                                </p>
                            </Dragger>


                        </DraggerWrapper>

                            
                        </FormItem>


                        )}
                        />


                    </div>

           </div>

            
            

            <Button.Root className="w-full mt-4">

                    <Button.Wrapper>
                      <Button.Content content="confirmar" />
                    </Button.Wrapper>

            </Button.Root>

         
        </AntdForm>
        
        
        </div>


    );


}