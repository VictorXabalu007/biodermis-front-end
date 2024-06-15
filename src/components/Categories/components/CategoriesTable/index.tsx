import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { useTableData } from "../../hooks/useTableData";
import { TableFilter } from "../TableFilter";
import { CategoryType } from "../../service/getCategory";
import { TableWrapper } from "../../../shared/Table/components/TableWrapper";
import * as C from '../../../../styles/TableStyles/styles'
import { validateRowSelected } from "../../../../functions/Validators/ValidateRowSelected/validateRowSelected";
import { TableSorters } from "../../../shared/Table/components/TableSorters";
import { Pagination } from "../../../shared/Pagination";
import { Spinner } from "../../../shared/Spinner";
import { Empty } from "antd";

export const CategoriesTable = () => {


    const {
        isLoading,
        data,
        setData,
        columns,
        columnFilters,
        setColumnFilters
    }  = useTableData();

    const table = useReactTable<CategoryType>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            columnFilters,
        },
        enableRowSelection: true,
        meta: {
            updateData: (rowIndex:number, data:any) => setData(
                prev => prev.map((row,index) => 
                    index === rowIndex ? {
                        ...prev[rowIndex],
                        ...data
                    } : row
                )
            )
        }
        

    })

    return (


        <TableWrapper>


        {isLoading ?
            
            <Spinner />

            : (

                <>

                {

                    data.length === 0 ?


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
                   
                            
                                </>
                            ))}
                        </tbody>
                    </C.Table>

                    <Pagination<CategoryType> table={table} />

                    </C.Container>



                        </>
                        
                
                    
                    )



                }
                
                
                
                </>


            )

        }

         



        </TableWrapper>


        
    );

}