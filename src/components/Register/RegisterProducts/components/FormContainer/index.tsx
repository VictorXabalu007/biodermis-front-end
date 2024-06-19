
import { useForm } from "react-hook-form"
import { ProductsDescForm } from "../ProductsDescForm"
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { ProductsDimensionForm } from "../ProductsDimensionForm";
import { Uploader } from "../Uploader";
import { ProductsPricesForm } from "../ProductPricesForm";
import { Form } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../../../../shared/Button";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../../../service/connection";
import { useMessageAction } from "../../../../../hooks/useMessageAction/useMessageAction";
import { getHeaders } from "../../../../../service/getHeaders";

const productsImageSchema = z.object({
    files: z.array(z.custom().refine(file => file !== null, 'Insira pelo menos uma imagem'),
    {required_error: 'Pelo menos uma imagem deve ser cadastrada!'}).refine(arr => arr.length !== 0, 'Pelo menos uma imagem é necessária!')
})

;

const productsDescriptionsSchema = z.object({
    productName : z.string({required_error: 'Nome do produto é necessário para o cadastro'})
    .min(1, 'Nome do produto não pode ser vazio'),
    category : z.number({required_error: 'A categoria é necessária para o cadastro!'}).min(1,'A categoria é necessária para o cadastro!'),
    description: z.string({required_error: 'Descrição do produto é necessária para o cadastro'})
    .min(1, 'Descrição do produto do produto não pode ser vazia'),
});

const productsDimensionSchema = z.object({
    weight: z.string({required_error:'Peso é necessário para o cadastro'})
    .min(1,'O peso não pode ser vazio'),
    height: z.string({required_error:'Altura é necessária para o cadastro'})
    .min(1,'A altura não pode ser vazia'),
    width: z.string({required_error:'Largura é necessária para o cadastro'})
    .min(1,'A largura não pode ser vazia'),
    depth: z.string({required_error:'Profundidade é necessária para o cadastro'})
    .min(1,'A profundidade não pode ser vazia'),
})

const productsPricesSchema = z.object({

    sellPrice: z.string({required_error: 'O preço de venda é necessário para cadastro'})
    .min(1, 'Preço de venda não pode ser vazio'),
    minPrice: z.string({required_error: 'O preço mínimo é necessário para cadastro'})
    .min(1, 'Preço mínimo não pode ser vazio'),
    maxPrice: z.string({required_error: 'O preço máximo é necessário para cadastro'})
    .min(1, 'Preço máximo não pode ser vazio'),

});

const productsSchema = z.object({

    ...productsDescriptionsSchema.shape,
    ...productsDimensionSchema.shape,
    ...productsImageSchema.shape,
    ...productsPricesSchema.shape

});

type Data = z.infer<typeof productsSchema>;

export interface ProductsData extends Data {
    id: string,

}

export const FormContainer = () => {


    const {success,error,contextHolder} = useMessageAction();
    
    const {formState:{errors},handleSubmit,control, reset} = useForm<ProductsData>({
        resolver: zodResolver(productsSchema),
        criteriaMode: 'all',
        mode: 'all'
    });


    const [data, setData] = useState({} as ProductsData)
    const [finish, setSuccess] = useState(false);
    const [id, setId] = useState<number>(0);


    const registerImage = useCallback(async () => {

        const formData = new FormData();
                
        data.files.map((image:any) => {
            formData.append('files', image.originFileObj as File); 
        });


        const headers = getHeaders();

    

            try {
    
                const req = await api.post(`/produtos/fotos/${id}`, formData, {
                    headers
                });
    
                console.log(req.data);
    
            } catch (error) {
                console.error('Error registering image:', error);
            }

        

        
    },[id]);

    useEffect(()=> {

        if(finish) {

            registerImage();

        }

    },[finish, registerImage, id])

    const mutation = useMutation({
        mutationFn: async (data:ProductsData)=> {


            const body = {

                "nome": data.productName,
                "descricao": data.description,
                "valormin": data.minPrice,
                "valormax": data.maxPrice,
                "valorvenda": data.sellPrice,
                "altura": data.height,
                "peso": data.weight,
                "largura": data.width,
                "profundidade": data.depth,
                "categoria_id": data.category

            }
            
            const headers = getHeaders();
            

            const req = await api.post('/produtos',body, {
                headers,
            })


            return req.data;

        },
        onSuccess: (res, context:ProductsData)=> {

            setData(context)
            setId(res.id)
            setSuccess(true)
            success(res.success);

    
            onReset();
       
        },
        onError: (err:any)=> {

            error(err.response.data.error);
            
        },
    })

    const onSubmit = (data:ProductsData) => {

        mutation.mutate(data);
        
    }

    const [form] = Form.useForm();

    const uploaderRef = useRef<any>();

    
    const onReset = () => {

        form.resetFields();
        reset({});
        if (uploaderRef.current) {
            uploaderRef.current.resetFiles();
        }
        
    };

    
    return (

        <Form
        form={form}
        onFinish={handleSubmit(onSubmit)}
        className="w-full"
        >   

        {contextHolder}

            <div className="flex lg:flex-row flex-col gap-10 w-full">

                <div>

                    <ProductsDescForm
                        errors={errors}
                        control={control}
                
                    />

                    <ProductsDimensionForm 
                        errors={errors}
                        control={control}
                    />
                

                </div>

                <div className="w-full">

                    <Uploader 
                        
                        ref={uploaderRef}
                        errors={errors}
                        control={control}
                    />
              
                    <ProductsPricesForm 
                        errors={errors}
                        control={control}
                    
                    />

                    <div className="flex gap-2 mt-10">

                    <Button.Root 
                    className="w-1/3" 
                    type="submit"
                    aria-label="submit fields"
                    >

                        <Button.Wrapper>
                            <Button.Content 
                                content="Enviar"
                                />
                        </Button.Wrapper>

                    </Button.Root>

                    <Button.Root 
                        className="w-1/3 bg-gray-neutral-200 hover:bg-gray-neutral-400 text-gray-neutral-950"
                        type="reset"
                        onClick={onReset}
                        aria-label="reset fields"
                    >
                        
                        <Button.Wrapper>

                            <Button.Content 
                                content="cancelar"
                                />

                        </Button.Wrapper>
                        
                    </Button.Root>

                    </div>



                </div>
                
        
            </div>


        </Form>
    )

}