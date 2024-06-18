
import { useMessageAction } from "../../../../hooks/useMessageAction/useMessageAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "antd";
import { Input } from "../../../shared/Input/Input";
import { ModalFooter } from "../../../Requests/components/RequestsTable/components/Modal/RequestEditor/ModalFooter";
import InputMoney from "../../../shared/Input/InputNumber";
import { api } from "../../../../service/connection";
import { useMutation } from "@tanstack/react-query";
import Select from "../../../shared/Input/Select";
import { getHeaders } from "../../../../service/getHeaders";
import { useProductsData } from "../../hooks/useProductsData";


const Footer = ModalFooter;

type FormModalProps = {
    handleClose: () => void;
}

export const FormModal = ({handleClose}:FormModalProps) => {

    const {contextHolder,success,error} = useMessageAction()

    const {allProducts} = useProductsData();

    const nameOptions = allProducts.map(p => ({
        value: p.nome,
        label: p.nome,
    }))

    const consultorProductRegisterSchema = z.object({
        valorprod: z.string({required_error: 'O valor do produto é necessário para o cadastro...'})
        .min(1, 'O valor do produto não pode ser vazio')
        .refine(val => val !== '.', 'O valor do produto é necessário para cadastro')
        ,
        nomeProduto: z.string().optional(),
  
        
    })

    type RegisterType = z.infer<typeof consultorProductRegisterSchema>

    const {handleSubmit, control, formState: {errors}} = useForm<RegisterType>({

        resolver: zodResolver(consultorProductRegisterSchema),
        mode: 'all',
        criteriaMode: 'all',

    });

    const mutation = useMutation({
        mutationFn: async (data:RegisterType & {id: number}) => {

        const headers = getHeaders();

        const req = await api.post(`/consultor/produtos/${data.id}`,
        {valorprod: data.valorprod}, {
            headers
        })

        return req.data

        },
        onSuccess: (res) => {

            success(res.success);
            setTimeout(()=> {
                window.location.reload();
            },2000)

        },
        onError(err:any) {

            console.log(err);
            
            error(err.response.data.error);

        }
    })


    const onSubmit = async (data:RegisterType) => {

        

        const id = allProducts.find(p => p.nome === data.nomeProduto)?.id;

        if(id) {

            const newData = {
                ...data,
                id: id
            }
    
            mutation.mutate(newData)
            
        } else {
            error('Produto não encontrado....')
        }
    }


    const [form] = Form.useForm();



    return (

        
        <Form 
        form={form}
        onFinish={handleSubmit(onSubmit)}
        >
            {contextHolder}

            <Controller 
                   name="valorprod"
                   control={control}
                   render={({field:{onChange, value}})=>(

                    <Form.Item 
                        name="valorprod"
                        validateStatus={errors.valorprod ? 'error' : 'success'}
                        help={errors.valorprod && errors.valorprod.message}
                        hasFeedback
                    >

                        <Input.Root className="my-2">

                            <Input.Label 
                            content="Valor do produto"
                            htmlFor="valorprod" 
                            className="text-gray-neutral-600 font-[600]"
                            />  


                            <InputMoney 
                                id="valorprod"
                                prefix={"R$"}
                                value={parseFloat(value)}
                                onChange={onChange}
                                className="rounded-md border py-2 px-2 border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
                            />

                        </Input.Root>

                    </Form.Item>

                    )}

                />

            <Controller 
                   name="nomeProduto"
                   control={control}
                   render={({field:{onChange}})=>(

                    <Form.Item 
                        name="nomeProduto"
                        validateStatus={errors.nomeProduto ? 'error' : 'success'}
                        help={errors.nomeProduto && errors.nomeProduto.message}
                        hasFeedback
                    >

                        <Input.Root className="my-2">

                            <Input.Label 
                            content="Nome do produto"
                            htmlFor="nomeProduto" 
                            className="text-gray-neutral-600 font-[600]"
                            />  

                            <Select
                                isSearchable
                                options={nameOptions}
                                defaultValue={nameOptions[0]}
                                // @ts-ignore
                                onChange={(selectedOption) => onChange(selectedOption?.value)}
                            />

                        </Input.Root>

                    </Form.Item>

                    )}

                />

            <Footer.Root>

            <Footer.Actions
                onClick={handleClose}
                content="Cancelar"
                key="cancel"
                type="button"
                

            />

            <Footer.Actions 
                content="Confirmar"
                key="ok"
                className="bg-brand-purple text-white hover:bg-brand-purple/75"
                type="submit"

            />




            </Footer.Root>



        </Form>
    )
}