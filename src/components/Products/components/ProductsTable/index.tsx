
import { useState } from "react";
import { TableWrapper } from "../../../shared/Table/components/TableWrapper";
import { TableFilter } from "../TableFilter/TableFilter";
import { ColumnFilter, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import * as C from '../../../../styles/TableStyles/styles'
import { useTableData } from "../../hooks/useTableData";
import { Pagination } from "../../../shared/Pagination";
import { ProductView } from "./components/ProductDescription";
import { TableSorters } from "../../../shared/Table/components/TableSorters";
import { Spinner } from "../../../shared/Spinner";
import { ProductsType } from "../../service/getProducts";
import { validateRowSelected } from "../../../../functions/Validators/ValidateRowSelected/validateRowSelected";
import { Empty } from "antd";



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
        debugTable: true,
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
        }

    });

    return (
        

        <TableWrapper>

        {contextHolder}
        {isLoading ?
            
            <Spinner />

            : (

                <>

                {

                    products.length === 0 ?


                    <>

                        <TableFilter 
                            columnsFilters={columnFilters}
                            setColumnFilters={setColumnFilters}
                        />

                        <Empty 
                            description="Sem dados no momento"
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
