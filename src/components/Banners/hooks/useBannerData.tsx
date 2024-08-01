import { useEffect, useState } from "react"
import { BannerType } from "../@types/BannerType"
import { useQuery } from "@tanstack/react-query"
import { getBanners } from "../service/getBanners"


export const useBannerData = () => {

    const {data:banners} = useQuery({
        queryKey:['banners'],
        queryFn:getBanners
    })

    const [data, setData] = useState<BannerType[]>([]);
    
    useEffect(()=> {
        if(banners){
            setData(banners)
        }
    },[banners])

    const isEmpty = data.every(d => d.imagens.length===0)
    
    return {
        data,
        setData,
        isEmpty
    }


}