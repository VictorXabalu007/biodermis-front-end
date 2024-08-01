import React, { Dispatch, useState } from "react"
import { BannerType } from "../@types/BannerType"
import { useBannerData } from "../hooks/useBannerData"
import { TableHeaderWrapper } from "../../shared/Table/components/TableHeaderWrapper"
import { Input } from "../../shared/Input/Input"
import { SearchIcon } from "../../shared/Icon/SearchIcon"
import { Button } from "../../shared/Button"
import { FaPlus } from "react-icons/fa6"
import Select from "../../shared/Input/Select"
import { SelectLabel } from "../../shared/Input/Select/SelectLabel"
import { BannersComponents } from "."


type BannerFilterProps = {
    setData:Dispatch<React.SetStateAction<BannerType[]>>
 
}

const selectItems = [
    {
        value: '',
        label: <SelectLabel onBold="Filtrar por: " afterBold="Todos" />
    },
    {
        value: 2,
        label: <SelectLabel onBold="Filtrar por: " afterBold="Promoção" />
    },
    {
        value: 3,
        label: <SelectLabel onBold="Filtrar por: " afterBold="Mais vendidos" />
    },
    {
        value: 1,
        label: <SelectLabel onBold="Filtrar por: " afterBold="Principal" />
    },
]

export const BannersFilters = ({setData}:BannerFilterProps) => {

    const {data:initialData} = useBannerData();

    const [bannerName,setBannerName] = useState('');

    const handleBannerNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setBannerName(value)
        if(value!==''){
            setData(prev => prev.filter(p => p.titulo.toLowerCase().includes(value.toLowerCase())))
        } else {
            setData(initialData)
        }
    }


    const handleSelectChange = (value:string) => {

        if(value === '') {
            setData(initialData)
        } else {
            setData(prev => prev.filter(p => p.id === parseFloat(value)))
        }

    }

    const [open,setOpen] = useState(false);

    const handleOpen = ()=> setOpen(!open)

    return (
        <TableHeaderWrapper heading="Banners gerais">

        <div className="flex flex-wrap justify-between items-center">

            <div className="flex flex-wrap gap-2">
                
                <Input.Root className="lg:w-[400px] w-full flex-1">

                    <Input.System
                    className="py-2 flex-1"
                    placeholder="Buscar banner"
                    suffix= {<SearchIcon />}
                    value={bannerName}
                    onChange={handleBannerNameChange}

                    />
                
                </Input.Root>

                <Select 
                    className="w-full md:w-[250px]"
                    defaultValue={selectItems[0]}
                    options={selectItems}
                    onChange={(e) => handleSelectChange(e.value)}
                />

            </div>

            <div className="flex flex-wrap gap-2">

                <Button.Root
                    onClick={handleOpen}
                >
                    <Button.Content content="Adicionar banner" />
                    <Button.Icon icon={FaPlus} />
                </Button.Root>

            </div>

            <BannersComponents.Register setOpen={setOpen} open={open} />

        </div>

    </TableHeaderWrapper>
    )
}