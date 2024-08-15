import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getHeaders } from "../../../service/getHeaders";
import { api } from "../../../service/connection";
import { useMessageAction } from "../../../hooks/useMessageAction/useMessageAction";


const categoryRegisterSchema = z.object({
    categoria: z.string({required_error: 'O nome da categoria é necessário para o cadastro...'})
    .min(1, 'O nome da categoria não pode ser vazio'),
});

export type CategoryRegisterType = z.infer<typeof categoryRegisterSchema>
export const useCategoryRegister = () => {
  

    const {contextHolder,success,error} = useMessageAction()


    const onSubmit = async (data:CategoryRegisterType) => {

        const headers = getHeaders();

        const req = await api.post('/categorias',{...data}, {
            headers
        })

        if(req.status === 201){
            success("Categoria cadastrada com sucesso")
            setTimeout(()=> {
                window.location.reload()
            },1000);
      
        } else {
            error('Algum erro ocorreu')
        }
        
        
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
