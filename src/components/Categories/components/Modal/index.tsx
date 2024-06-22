import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "antd"
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../../../shared/Input/Input";
import { ModalFooter } from "../../../Requests/components/RequestsTable/components/Modal/RequestEditor/ModalFooter";
import { api } from "../../../../service/connection";

import { useMessageAction } from "../../../../hooks/useMessageAction/useMessageAction";
import { getHeaders } from "../../../../service/getHeaders";


const Footer = ModalFooter;

export const FormModal = ({handleClose}:{handleClose: ()=> void}) => {

    const {contextHolder,success,error} = useMessageAction()


    const categoryRegisterSchema = z.object({
        categoria: z.string({required_error: 'O nome da categoria é necessário para o cadastro...'})
        .min(1, 'O nome da categoria não pode ser vazio'),
    })

    type RegisterType = z.infer<typeof categoryRegisterSchema>

    const {handleSubmit, control, formState: {errors}} = useForm<RegisterType>({

        resolver: zodResolver(categoryRegisterSchema),
        mode: 'all',
        criteriaMode: 'all',
        defaultValues: {
            categoria: '',
        }


    });


    const onSubmit = async (data:RegisterType) => {

        const headers = getHeaders();

        const req = await api.post('/categorias',{...data}, {
            headers
        })

        if(req.status === 201){
            success("Categoria cadastrada com sucesso")
            setTimeout(()=> {
                handleClose();
                window.location.reload()
            },1000);
      
        } else {
            error('Algum erro ocorreu')
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
                   name="categoria"
                   control={control}
                   render={({field:{onChange}})=>(

                    <Form.Item 
                        name="categoria"
                        validateStatus={errors.categoria ? 'error' : 'success'}
                        help={errors.categoria && errors.categoria.message}
                        hasFeedback
                    >

                        <Input.Root className="my-2">

                            <Input.Label 
                            content="Nome da categoria"
                            htmlFor="category" 
                            className="text-gray-neutral-600 font-[600]"
                            />

                            <Input.System 
                            id="category"
                            className="border-purple-solid-950 placeholder-purple-solid-950 text-sm font-[600]"
                            placeholder="ex: cabelos"
                            onChange={onChange}
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
               
    
            >
                Cancelar
            </Footer.Actions>

            <Footer.Actions 
                content="Confirmar"
                type="submit"

            >
                Confirmar
            </Footer.Actions>




            </Footer.Root>



        </Form>
    )
}