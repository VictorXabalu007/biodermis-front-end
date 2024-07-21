import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const updateSchema = z.object({status:z.string({required_error:'Selecione uma opção de status!'})
.min(1, 'Selecione uma opção de status!')})

type UpdateBannerType = z.infer<typeof updateSchema>

export const useBannerUpdate = () => {

    const {handleSubmit,control,formState:{errors},reset} = useForm<UpdateBannerType>({
        resolver:zodResolver(updateSchema)
    })

    const onSubmit = (data:UpdateBannerType) => {
        console.log(data);
    }

    return {
        handleSubmit,
        control,
        errors,
        reset,
        onSubmit
    }
}