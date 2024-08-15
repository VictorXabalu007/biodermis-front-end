
import { z } from "zod";




export const bannerSchema = z.object({
    imagem: z.array(z.custom().refine(file => file !== null, 'Insira pelo menos um banner!'),
    {required_error: 'Pelo menos um banner deve ser cadastrado!'}).refine(arr => arr.length !== 0, 'Pelo menos um banner é necessário!')
    .transform(file => file[0]),
    ordem: z.string({required_error:'Por favor, selecione a Ordem  do banner!'})
    .min(1, 'Por favor, selecione a Ordem do banner!'),
    titulo: z.string({required_error:'Por favor, selecione o título do banner!'})
    .min(1, 'Por favor, selecione o título do banner!'),

});

export const editBannerSchema = z.object({
    imagem: z.array(z.custom().refine(file => file !== null, 'Insira pelo menos um banner!'),
    {required_error: 'Pelo menos um banner deve ser cadastrado!'}).refine(arr => arr.length !== 0, 'Pelo menos um banner é necessário!')
    .transform(file => file[0]),
    ordem: z.string({required_error:'Por favor, selecione a Ordem  do banner!'})
    .min(1, 'Por favor, selecione a Ordem do banner!'),

});

export type BannerRegisterType = z.infer<typeof bannerSchema>
export type BannerUpdateType = z.infer<typeof editBannerSchema> & {id: number}