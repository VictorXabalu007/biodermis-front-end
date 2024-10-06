import React, { Dispatch, useState } from "react"
import { TableHeaderWrapper } from "../shared/Table/table-header-wrapper"
import { FaPlus } from "react-icons/fa6"
import Select from "../shared/Input/select"
import { SelectLabel } from "../shared/Input/select-label"
import BannerRegisterModal from "./banner-register-modal"
import { Button, Flex, Input } from "antd"
import { SearchIcon } from "../shared/Icon/search"
import { useBannerData } from "../../hooks/banners/useBannerData"


type Props = {
    setData:Dispatch<React.SetStateAction<Banner[]>>
 
}

const selectItems = [
    {
        value: 0,
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

const BannersFilters = ({setData}:Props) => {

    const {data:initialData} = useBannerData();

    const [bannerName,setBannerName] = useState('');

    const handleBannerNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setBannerName(value)

        if(value!==''){
            setData(initialData.filter(p => p.titulo.toLowerCase().includes(value.toLowerCase())))
        } else {
            setData(initialData)
        }
    }


    const handleSelectChange = (value:number) => {

        if(value === 0) {
            setData(initialData)
        } else {
            setData(initialData.filter(p => p.id === value))
        }

    }

    const [open,setOpen] = useState(false);

    const handleOpen = ()=> setOpen(!open)

    return (

        <TableHeaderWrapper heading="Banners gerais">

        <Flex align="center" justify="space-between" wrap>

            <Flex gap={25} align="center">
                
           
                <Input
                    onChange={handleBannerNameChange}
                    value={bannerName}
                    placeholder="bucar banner"
                    suffix= {<SearchIcon />}
                    size="large"

                  
                    
                />

                <Select 
                    className="w-full md:w-[250px]"
                    defaultValue={selectItems[0]}
                    options={selectItems}
                    onChange={handleSelectChange}
                />

            </Flex>

            <Flex 
                gap={5} 
                wrap
            >

                <Button size="large" onClick={handleOpen}>

                    <Flex gap={5} align="center">

                        Adicionar banner <FaPlus />

                    </Flex>
                </Button>

            </Flex>

            <BannerRegisterModal setOpen={setOpen} open={open} />

        </Flex>

    </TableHeaderWrapper>
    )
}

export default BannersFilters