import { z } from "zod";

const productsImageSchema = z.object({
    files: z.array(z.custom().refine(file => file !== null, 'Insira pelo menos uma imagem'),
    {required_error: 'Pelo menos uma imagem deve ser cadastrada!'}).refine(arr => arr.length !== 0, 'Pelo menos uma imagem é necessária!')
})

;

const productsDescriptionsSchema = z.object({
    productName : z.string({required_error: 'Nome do produto é necessário para o cadastro'})
    .min(1, 'Nome do produto não pode ser vazio'),
    category : z.array(z.number({required_error: 'A categoria é necessária para o cadastro!'}),
    {required_error:'Pelo menos uma categoria é necessária para o cadastro!'})
    .refine(arr => arr.length !== 0, 'Pelo menos uma categoria é necessária para o cadastro!')
    ,
    description: z.string({required_error: 'Descrição do produto é necessária para o cadastro'})
    .min(1, 'Descrição do produto do produto não pode ser vazia')
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

export {
    productsSchema
}