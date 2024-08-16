import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { SelectLabel } from "../../shared/Input/select-label"
import { useMutation } from "@tanstack/react-query"
import { api } from "../../../service/connection"
import { getHeaders } from "../../../service/getHeaders"
import { useMessageAction } from "../../../hooks/useMessageAction/useMessageAction"
import { BannerRegisterType, bannerSchema } from "../../../validations/registerBannerValidation"



export const useBannerRegister = () => {


    const {handleSubmit,control,formState:{errors},reset} = useForm<BannerRegisterType>({
        resolver:zodResolver(bannerSchema)
    })

    const {contextHolder,success,error} = useMessageAction()

    const registerBanner = useMutation({
        mutationFn: async (data:BannerRegisterType)=> {
            
            const headers = getHeaders();
            const formData = new FormData();

        
            formData.append('order',data.ordem)
            //@ts-ignore
            formData.append('file',data.imagem!.originFileObj as File)
            

            const req = await api.post(`/carrossel/${data.titulo}`, formData, {
                headers
            });

            return req.data;

        },
        onSuccess:(res)=> {
        
            success(res.success)
            window.location.reload()
            
        },
        onError:(err:any) => {
    
            error(err.data.response.error)
            
        }
    })

    const onSubmit = (data:BannerRegisterType) => {
        registerBanner.mutate(data)
    }

    const bannerStatusOptions = [
        {
            value: 'ativo',
            label: <SelectLabel onBold="Status: " afterBold="Ativo" />
        },
        {
            value: 'inativo',
            label:  <SelectLabel onBold="Status: " afterBold="Inativo" />
        },
    ]
    const bannerCategoryOptions = [
        {
            value: '1',
            label: <SelectLabel onBold="Título: " afterBold="Principal" />
        },
        {
            value: '2',
            label: <SelectLabel onBold="Título: " afterBold="Promocao" />
        },
        {
            value: '3',
            label: <SelectLabel onBold="Título: " afterBold="Mais vendido" />
        },
    ]

    return {
        handleSubmit,
        control,
        errors,
        onSubmit,
        reset,
        bannerStatusOptions,
        bannerCategoryOptions,
        contextHolder
    }

}