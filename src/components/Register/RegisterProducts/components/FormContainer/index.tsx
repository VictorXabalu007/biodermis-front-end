
import { useForm } from "react-hook-form"
import { ProductsDescForm } from "../ProductsDescForm"
import { z } from "zod";
import { Button } from "../../../../shared/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductsDimensionForm } from "../ProductsDimensionForm";
import { Uploader } from "../Uploader";
import { ProductsPricesForm } from "../ProductPricesForm";



const productsImageSchema = z.object({
    productsImage: z.array(z.object({
        name: z.string(), 
        size: z.number().min(1,'Pelo menos uma imagem é necessária para cadastro'),
        type: z.string(), 
    }),{required_error: 'Pelo menos uma imagem deve ser cadastrada'})
    .refine(val => val.length>0,'Insira pelo menos uma imagem')
})

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

export type ProductsData = z.infer<typeof productsSchema>

export const FormContainer = () => {

    
    const {formState:{errors},handleSubmit,control} = useForm<ProductsData>({
        resolver: zodResolver(productsSchema),
        criteriaMode: 'all',
        mode: 'all'
    });

    const onSubmit = (data:ProductsData) => {

        console.log(data);
        
    }
    
    return (

        <form
        onSubmit={handleSubmit(onSubmit)}
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
                    type="submit">

                        <Button.Wrapper>
                            <Button.Content 
                                content="Enviar"
                                />
                        </Button.Wrapper>

                    </Button.Root>

                    <Button.Root 
                        className="w-1/3 bg-gray-neutral-200 hover:bg-gray-neutral-400 text-gray-neutral-950"
                        type="reset"
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


        </form>
    )

}