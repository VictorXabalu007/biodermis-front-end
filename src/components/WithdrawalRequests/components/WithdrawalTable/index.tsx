

import { TableWrapper } from "../../../shared/Table/components/TableWrapper"
import { TableHeader } from "../TableHeader"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import * as C from '../../../../styles/TableStyles/styles'
import { useTableData } from "../../hooks/useTableData"
import { Pagination } from "../../../shared/Pagination"
import { TableSorters } from "../../../shared/Table/components/TableSorters"
import { Spinner } from "../../../shared/Spinner"
import { Empty } from "antd"


export const WithdrawalTable = () => {

 
    const {
        columnFilters,
        data, 
        columns, 
        setColumnFilters, 
        sorting, 
        setSorting,
        isLoading
    
    } = useTableData();


    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
            sorting: sorting
        },
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getCoreRowModel:getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting
      
    });


    return (

        <TableWrapper>

            {isLoading ?
            
                <Spinner /> :

                (
                <>


                    {data.length === 0 ? 
                    
            
                    <>

                        <TableHeader 
                        columnsFilters={columnFilters}
                        setColumnFilters={setColumnFilters}
                        />

                        <Empty
                            description={"Sem dados no momento"}
                        
                        />

                    </>


                    : (

                        <>

                        <TableHeader 
                        columnsFilters={columnFilters}
                        setColumnFilters={setColumnFilters}
                        />

                        <C.Container>

                        <C.Table>
                        <C.Thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <C.EvenRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header)=> (
                                        

                                        <TableSorters header={header} />
                                    
                                    ))}
                                </C.EvenRow>
                            ))}
                        </C.Thead >

                        <tbody>
                            {table.getRowModel().rows.map((row)=> (
                                <C.HoverRow key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <C.Td key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell,
                                                cell.getContext())}
                                        </C.Td>
                                    ))}
                                </C.HoverRow>
                            ))}
                        </tbody>
                        </C.Table>

                        </C.Container>

                        <Pagination table={table} />
                        </>

                    )
                                    
                
                    }
                    
                
                    </>
                )
        
            }


            
        </TableWrapper>


    );


}