import { ColumnFilter, Table } from "@tanstack/react-table"
import { useEffect, useState } from "react"


type UseEmptinessProps<T> = {
    table: Table<T>,
    columnFilters:ColumnFilter[]
    isLoading: boolean
    data:T[]

}

export const useEmptiness = <T,>({table,isLoading, columnFilters,data}:UseEmptinessProps<T>) => {


    const [isEmpty, setIsEmpty] = useState(false)

    useEffect(()=> {

        if(!isLoading && table.getFilteredRowModel().rows.length === 0 || data.length === 0) {
        
            setIsEmpty(true);

        } else {
            setIsEmpty(false);
        }
        
    },[columnFilters, isEmpty, table.getFilteredRowModel, data]);

    return {
        isEmpty
    }

}