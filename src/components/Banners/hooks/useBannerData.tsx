import { useState } from "react"
import { BannerType } from "../@types/BannerType"


export const useBannerData = () => {

    const bannerData:BannerType[] = []

    for(let i = 0; i<10; i++){
        bannerData.push({
            id:i,
            src: '',
            name:`Banner ${i}`,
            status: 'ativo',
            category: i % 2 === 1 ? 'maisVendido' : i + 1 === 3 ? 'principal' :'promocao'
        })
    }

    const [data, setData] = useState<BannerType[]>(bannerData);

    return {
        data,
        setData
    }


}