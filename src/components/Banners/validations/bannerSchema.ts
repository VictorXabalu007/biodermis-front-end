import { z } from "zod";




export const bannerSchema = z.object({
    src: z.array(z.custom().refine(file => file !== null, 'Insira pelo menos um banner!'),
    {required_error: 'Pelo menos um banner deve ser cadastrado!'}).refine(arr => arr.length !== 0, 'Pelo menos um banner é necessário!'),
    name: z.string({required_error:'Por favor de um nome ao banner!'}).min(1, 'O Por favor de um nome ao banner!'),
    status: z.string({required_error:'Por favor, selecione o status do banner!'})
    .min(1, 'Por favor, selecione o status do banner!'),
    category: z.string({required_error:'Por favor, selecione a categoria do banner!'})
    .min(1, 'Por favor, selecione a categoria do banner!'),

});