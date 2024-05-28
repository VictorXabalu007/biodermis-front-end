
import { useForm } from "react-hook-form"
import { ProductsDescForm } from "../ProductsDescForm"
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { ProductsDimensionForm } from "../ProductsDimensionForm";
import { Uploader } from "../Uploader";
import { ProductsPricesForm } from "../ProductPricesForm";
import { Button as AntdBtn, Form, Modal } from "antd";
import { useRef, useState } from "react";
import { PRODUCTS_DATA, PRODUCT_ID } from "../../../../../constants/SessionStorageKeys/sessionStorageKeys";
import { useSessionId } from "../../../../../hooks/useSessionId/useSessionId";
import { Button } from "../../../../shared/Button";
import { BtnWrapper } from "./styles";
import { useNavigate } from "react-router-dom";
import { PRODUCTS } from "../../../../../constants/paths/paths";

const productsImageSchema = z.object({
    productsImage: z.array(z.object({
        name: z.string(), 
        size: z.number().min(1, 'Pelo menos uma imagem é necessária para cadastro'),
        type: z.string(), 
        originFileObj: z.object({
            uid: z.string(),
  
        }),
    }), { required_error: 'Pelo menos uma imagem deve ser cadastrada' })
    .refine(val => val.length > 0, 'Insira pelo menos uma imagem')
});

const productsDescriptionsSchema = z.object({
    productName : z.string({required_error: 'Nome do produto é necessário para o cadastro'})
    .min(1, 'Nome do produto não pode ser vazio'),
    category : z.string({required_error: 'Categoria é necessário para o cadastro'})
    .min(1, 'Categoria não pode ser vazia'),
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
    ficticiousPrice: z.string({required_error: 'O preço fictício é necessário para cadastro'})
    .min(1, 'Preço fictício não pode ser vazio'),

})

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

    const navigate = useNavigate();

    const [products, setProducts] = useState<ProductsData[]>(()=> {
        const storedProducts = sessionStorage.getItem(PRODUCTS_DATA);
        return storedProducts ? JSON.parse(storedProducts) : [];
    });
    
    const {formState:{errors},handleSubmit,control, reset} = useForm<ProductsData>({
        resolver: zodResolver(productsSchema),
        criteriaMode: 'all',
        mode: 'all'
    });

    const {lastId, setLastId} = useSessionId({key: PRODUCT_ID})

    
    const success = () => {
        Modal.success({
            width: 500,
            closable: true,
            maskClosable: true,
            title: 'Produto cadastrado com sucesso',
            content: 'Você pode gerenciar seus produtos atravéz do seu dashboard',
            okButtonProps: {className: 'bg-brand-purple hover:bg-brand-purple/25 ok-btn'},
            footer: (_,{OkBtn})=> (
                <div className="flex">

                    <BtnWrapper>

                        <AntdBtn onClick={() => {
                            navigate(PRODUCTS)
                            Modal.destroyAll();
                        }} className="products-btn">
                            Ir para produtos
                        </AntdBtn>
                        <OkBtn />

                    </BtnWrapper>

                </div>
            )
        });
      };

    const  onSubmit = async (data:ProductsData) => {

        const { id, ...restData } = data;
        const newId = lastId + 1;
        const newData = { 
          id: newId.toString(), 
          ...restData };
        setProducts(prevProducts => [...prevProducts, newData]);
        setLastId(newId);
        sessionStorage.setItem(PRODUCT_ID, newId.toString()); 
        sessionStorage.setItem(PRODUCTS_DATA, JSON.stringify([...products, newData])); 
        console.log(newData);
        success();
        onReset();
        
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