

import { Button } from "../../../shared/Button";

import { UserImage } from "../../../shared/Image/UserImage";
import { Input } from "../../../shared/Input/Input";
import InputMoney from "../../../shared/Input/InputNumber";
import { Form as AntdForm, Typography, Upload, message } from "antd";
import { FaCheck } from "react-icons/fa6";
import { IoCopyOutline } from "react-icons/io5";
import { UploadProps } from "antd/lib";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../../shared/Form";
import FormItem from "antd/es/form/FormItem";
import { DraggerWrapper } from "../../../Register/RegisterConsultor/components/FormContainer/components/Uploader/styles/styles";

const { Paragraph } = Typography;
const { Dragger } = Upload;


const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',

  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
  beforeUpload() {
    return false
  }
};

type WithDrawalModalProps  = {
    handleClose: () => void;
}

export const WithDrawalModal = ({handleClose}:WithDrawalModalProps) => {

    const proofSchema = z.object({
        pixProof: z.object({
            name: z.string(), 
            size: z.number().min(1,'Nenhum arquivo anexado...'),
            type: z.string(), 
        },{required_error: 'Compranvante é obrigatório para confirmação'})
    })

    type Data = z.infer<typeof proofSchema>;

    const {handleSubmit, control, formState: {errors}} = useForm<Data>({
        resolver: zodResolver(proofSchema),
        criteriaMode: 'all',
        mode: 'all'
    });

    

    const onSubmit = (data:Data) => {

        console.log(data);
        handleClose();
        
    }

    const [form] = AntdForm.useForm();

    return (


        <div>

        <UserImage 
        className="my-2"
        />

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
                                console.log(info.file, info.fileList);
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