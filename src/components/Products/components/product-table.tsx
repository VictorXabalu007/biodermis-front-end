


import { useState } from "react";

import { ColumnFilter, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import * as C from '../../../styles/TableStyles/styles'
import { ProductsType } from "../service/getProducts";
import { useTableData } from "../hooks/useTableData";
import { useEmptiness } from "../../../hooks/useEmptiness/useEmptiness";
import { TableWrapper } from "../../shared/Table/components/TableWrapper";
import { Spinner } from "flowbite-react";
import { TableFilter } from "./table-filter";
import { Empty } from "antd";
import { TableSorters } from "../../shared/Table/components/TableSorters";
import { validateRowSelected } from "../../../functions/Validators/ValidateRowSelected/validateRowSelected";
import { Pagination } from "../../shared/Pagination";
import { ProductView } from "./product-description";


export const ProductsTable = () => {

    const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
    const {products, columns, setProducts, isLoading, contextHolder} = useTableData();

    const table = useReactTable<ProductsType>({

        data: products,
        columns,
        getCoreRowModel: getCoreRowModel(),
        state: {
            columnFilters,
        },
        onColumnFiltersChange: () => {

        },
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        enableRowSelection: true,
        getRowCanExpand: () => true,
        meta: {
            updateData: (rowIndex:number, data:any) => setProducts(
                prev => prev.map((row,index) => 
                    index === rowIndex ? {
                        ...prev[rowIndex],
                        ...data
                    } : row
                )
            )
        },
    
        

    });


    const {isEmpty} = useEmptiness({table,columnFilters,isLoading, data:products});

    return (
        

        <TableWrapper>

        {contextHolder}

        {isLoading ?
            
            <Spinner />

            : (

                <>

                {

                    isEmpty ?

                    <>

                        <TableFilter 
                            columnsFilters={columnFilters}
                            setColumnFilters={setColumnFilters}
                        />

                        <Empty 
                            description="Nenhum produto foi encontrado"
                        />
                    </>


                    : (

                        <>


                    <TableFilter 
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
                        </C.Thead>

                    
                        <tbody>

                            {table.getRowModel().rows.map((row)=> (

                                <>
                            
                                    <C.HoverRow key={row.id}>
                                        {row.getVisibleCells().map(cell => (
                                            <C.Td style={validateRowSelected(row)} key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell,
                                                    cell.getContext())}
                                            </C.Td>
                                        ))}
                                    </C.HoverRow>

                                    {
                                        row.getIsExpanded() && 
                                        (
                                            <td colSpan={row.getVisibleCells().length}>
                                                <ProductView 
                                                    data={row.original}
                                                    row={row}
                                                    table={table}
                                                />
                                                
                                            </td>
                                        )
                                    }
                                
                                </>
                            ))}
                        </tbody>
                    </C.Table>

                    <Pagination<ProductsType> table={table} />

                    </C.Container>



                        </>
                        
                
                

                    )



                }
                
                
                
                </>


            )

        }


        </TableWrapper>


    );

};
