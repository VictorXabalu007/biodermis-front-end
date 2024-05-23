

import { TableWrapper } from "../../../shared/Table/components/TableWrapper"
import { TableHeader } from "../TableHeader"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import * as C from '../../../../styles/TableStyles/styles'

import { useTableData } from "../../hooks/useTableData"
import { Pagination } from "../../../shared/Pagination"


export const WithdrawalTable = () => {

 
    const {
        columnFilters,
        data, 
        columns, 
        setColumnFilters, 
        sorting, 
        setSorting} = useTableData();


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
        debugTable: true,
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting
      
    });


    return (

        <TableWrapper>

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
                                <C.Th key={header.id} 
                                onClick={header.column.getToggleSortingHandler()}
                                >
                                    <div className="mx-3 flex">
                                        {flexRender(header.column.columnDef.header,
                                            header.getContext())}
                                                                             
                                            {
                                               header.column.getIsSorted() === 'asc' ? '⬆️' :
                                               header.column.getIsSorted() === 'desc' ? '⬇️' :
                                               null
                                            }
                                        
                                    </div>
                                </C.Th>
                                
                            
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

            
        </TableWrapper>


    );


}