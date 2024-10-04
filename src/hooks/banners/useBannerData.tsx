import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getBanners } from "../../components/Banners/service/getBanners";



export const useBannerData = () => {

    const {data:banners} = useQuery({
        queryKey:['banners'],
        queryFn:getBanners
    })

    const [data, setData] = useState<Banner[]>([]);
    
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