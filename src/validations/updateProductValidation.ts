import { z } from "zod";





const updateProductSchema = z.object({
    nome: z
      .string({ required_error: 'O nome é obrigatório' })
      .min(3, { message: "O nome deve ter pelo menos 3 caracteres" })
      .max(50, { message: "O nome deve ter no máximo 50 caracteres" }),
    descricao: z
      .string({ required_error: 'A descrição é obrigatória' })
      .min(3, { message: "A descrição deve ter pelo menos 3 caracteres" }),
    valormin: z
      .string({ required_error: 'O valor minimo é obrigatório' })
      .min(0, { message: "O valor minimo deve ser maior que 0" }),
    valormax: z
      .string({ required_error: 'O valor maximo é obrigatório' })
      .min(0, { message: "O valor maximo deve ser maior que 0" }),
    valorvenda: z
      .string({ required_error: 'O valor de venda é obrigatório' })
      .min(0, { message: "O valor de venda deve ser maior que 0" }),
      altura: z
      .string({ required_error: 'A altura é obrigatória' })
      .min(0, { message: "A altura deve ser maior que 0" }),
      largura: z
      .string({ required_error: 'A largura é obrigatória' })
      .min(0, { message: "A largura deve ser maior que 0" }),
      profundidade: z
      .string({ required_error: 'A profundidade é obrigatória' })
      .min(0, { message: "A profundidade deve ser maior que 0" }),
      categoria_ids: z
      .array(z.number({ required_error: 'A categoria é obrigatória' }))
      .nonempty({ message: "A categoria é obrigatória" }),
      peso: z
      .string({ required_error: 'O peso é obrigatório' })
      .min(0, { message: "O peso deve ser maior que 0" }),
      imagens: z.array(z.custom().refine(file => file !== null, 'Insira pelo menos uma imagem'),
      {required_error: 'Pelo menos uma imagem deve ser cadastrada!'}).refine(arr => arr.length !== 0, 'Pelo menos uma imagem é necessária!')
  });

export {
    updateProductSchema
}