import { z } from "zod";

const updateOrderSchema
= z.object({
  sendDate: z
    .string({ required_error: "Data de envio é obrigatória" })
    .min(1, "A data de validade não pode ser vazia..."),
  sendCode: z
    .string({ required_error: "Código de envio é obrigatório" })
    .min(1, "O código de envio não pode ser vazio..."),
  shippingForm: z.string().optional(),
});

export type UpdateRequestType = z.infer<typeof updateOrderSchema>;

export {
    updateOrderSchema
}
