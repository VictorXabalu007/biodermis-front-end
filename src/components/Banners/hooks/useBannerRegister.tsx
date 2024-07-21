import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { bannerSchema } from "../validations/bannerSchema"
import { BannerType } from "../@types/BannerType"
import { SelectLabel } from "../../shared/Input/Select/SelectLabel"



export const useBannerRegister = () => {


    const {handleSubmit,control,formState:{errors},reset} = useForm<BannerType>({
        resolver:zodResolver(bannerSchema)
    })

    const onSubmit = (data:BannerType) => {

        console.log(data);
        
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
            value: 'principal',
            label: <SelectLabel onBold="Categoria: " afterBold="Principal" />
        },
        {
            value: 'promocao',
            label: <SelectLabel onBold="Categoria: " afterBold="Promocao" />
        },
        {
            value: 'maisVendido',
            label: <SelectLabel onBold="Categoria: " afterBold="Mais vendido" />
        },
    ]

    return {
        handleSubmit,
        control,
        errors,
        onSubmit,
        reset,
        bannerStatusOptions,
        bannerCategoryOptions
    }

}