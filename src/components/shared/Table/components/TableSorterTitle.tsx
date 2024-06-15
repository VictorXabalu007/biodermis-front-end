import { Header } from "@tanstack/react-table";
import { Flex, Tooltip } from "antd";
import { ReactNode } from "react";
import { ArrowUpDownIcon } from "../../Icon/ArrowUpDownIcon";
import { HiOutlineArrowNarrowDown, HiOutlineArrowNarrowUp } from "react-icons/hi";


type TableHeaderProps<T> = {
    title: ReactNode | string
    header:Header<T, string>
}

const DEFAULT_CLASSNAME = 'text-lg text-brand-purple hover:text-brand-purple/50'

export const TableSorterTitle = <T,>({header, title}:TableHeaderProps<T>) => {
    


    return (

        <Tooltip title={!header.column.getIsSorted() ? 'Ordenar': header.column.getIsSorted() === 'desc' ? 'Ordenar: Decrescente': 'Ordenar: Crescente'}>

        <Flex align="center" gap={2}>

            {title}
            {!header.column.getIsSorted() ?

       
                    <ArrowUpDownIcon
                
                
                    />
            
           
               

                : (
                    header.column.getIsSorted() === 'desc' ? 
                        <HiOutlineArrowNarrowDown className={DEFAULT_CLASSNAME} /> 
                        : <HiOutlineArrowNarrowUp className={DEFAULT_CLASSNAME} />

                )

            }


                
                    
     
            
        </Flex>
        </Tooltip>

    )
}