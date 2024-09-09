import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useMutation } from "@tanstack/react-query"
import { api } from "../../../service/connection"
import { getHeaders } from "../../../service/getHeaders"
import { useMessageAction } from "../../../hooks/useMessageAction/useMessageAction"
import { BannerUpdateType, editBannerSchema } from "../../../validations/registerBannerValidation"



export const useBannerUpdate = ({id}:{id:number}) => {

    const {handleSubmit,control,formState:{errors},reset,setValue} = useForm<BannerUpdateType>({
        resolver:zodResolver(editBannerSchema)
    })

    const {contextHolder,success,error} = useMessageAction()

    const mutation = useMutation({
        mutationFn: async (data:BannerUpdateType) => {

            const formData = new FormData();

            const headers = {
                ...getHeaders(),
                'Content-Type': 'multipart/form-data' 
              };

            formData.append('order',data.ordem)
            //@ts-ignore
            formData.append('file',data.imagem!.originFileObj as File)

            const req = await api.patch(`/carrossel/${id}`,formData,{
                headers
            })

            return req.data

        },
        onSuccess:(res)=>{
     
            success(res.success)
            setTimeout(()=> (
                window.location.reload()
            ),1000)
            
        },
        onError: (err:any)=> {
    
            error(err.data.response.error)
            
        }
    })

    const onSubmit = (data:BannerUpdateType) => {
        mutation.mutate(data);
    }

    return {
        handleSubmit,
        control,
        errors,
        reset,
        onSubmit,
        contextHolder,
        setValue
    }
}