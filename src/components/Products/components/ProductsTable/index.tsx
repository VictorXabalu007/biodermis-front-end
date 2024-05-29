
import { useState } from "react";
import { TableWrapper } from "../../../shared/Table/components/TableWrapper";
import { TableFilter } from "../TableFilter/TableFilter";
import { ColumnFilter, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import * as C from '../../../../styles/TableStyles/styles'
import { useTableData } from "../../hooks/useTableData";
import { Pagination } from "../../../shared/Pagination";
import { ProductView } from "./components/ProductDescription";
import { ProductsData } from "../../../Register/RegisterProducts/components/FormContainer";
import { TableSorters } from "../../../shared/Table/components/TableSorters";


export const ProductsTable = () => {

    const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
    const {products, columns, setProducts} = useTableData();

    const table = useReactTable<ProductsData>({

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
            updateData: (rowIndex:number, columnId:string, value:any) => setProducts(
                prev => prev.map((row,index) => 
                    index === rowIndex ? {
                        ...prev[rowIndex],
                        [columnId] : value
                    } : row
                )
            )
        }

    });

    return (

        <TableWrapper>

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
                                        <C.Td style={{background: row.getIsSelected() ? '#DCDCDC' : ''}} key={cell.id}>
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

                <Pagination<ProductsData> table={table} />
    
                </C.Container>

        </TableWrapper>


    );

};
