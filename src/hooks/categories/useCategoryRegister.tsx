import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {  post } from "../../service/connection";
import { useMessageAction } from "../useMessageAction";
import { useMutation } from "@tanstack/react-query";


const categoryRegisterSchema = z.object({
    categoria: z.string({required_error: 'O nome da categoria é necessário para o cadastro...'})
    .min(1, 'O nome da categoria não pode ser vazio'),
});

export type CategoryRegisterType = z.infer<typeof categoryRegisterSchema>
export const useCategoryRegister = () => {
  

    const {contextHolder,success,error} = useMessageAction()

    const categoryRegisterMutation = useMutation({
        mutationFn: async (data:CategoryRegisterType) => {

            const req = await post('/categorias',{...data})
            return req
        },
        onSuccess: () => {
            success("Categoria cadastrada com sucesso")
            setTimeout(()=> {
                window.location.reload()
            },1000);
        },
        onError: (err) => {
            console.log(err)
            error('Algum erro ocorreu')
        },
    })

    const onSubmit = async (data:CategoryRegisterType) => {

        categoryRegisterMutation.mutate(data)
          
    }


    const {handleSubmit, control, formState: {errors}} = useForm<CategoryRegisterType>({

        resolver: zodResolver(categoryRegisterSchema),
        mode: 'all',
        criteriaMode: 'all',
        defaultValues: {
            categoria: '',
        }


    });

    return {
        handleSubmit,
        control,
        errors,
        contextHolder,
        onSubmit
    }


}
