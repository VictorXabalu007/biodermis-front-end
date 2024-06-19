
import { TableWrapper } from "../../../shared/Table/components/TableWrapper";
import { TableHeader } from "../TableHeader";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import * as C from '../../../../styles/TableStyles/styles'
import { Pagination } from "../../../shared/Pagination";
import { useTableData } from "../../hooks/useTableData";
import { TableSorters } from "../../../shared/Table/components/TableSorters";
import { Spinner } from "../../../shared/Spinner";
import { UserCredentials } from "../../../../@types/UserData/UserData";
import { Empty } from "antd";
import { useEmptiness } from "../../../../hooks/useEmptiness/useEmptiness";


export const ConsultorsTable = () => {

    const {
        data, 
        columns, 
        columnFilters,
        setColumnFilters,
        sorting,
        setSorting, 
        setData,
        isLoading
    } = useTableData();

    const table = useReactTable<UserCredentials>({
        data,
        columns,
        state: {
            columnFilters,
            sorting
        },
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        columnResizeMode: 'onChange',
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
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

    });

    const {isEmpty} = useEmptiness({table,columnFilters,isLoading,data})


    return (

            

            <TableWrapper>


                {isLoading ? 
                
                    <Spinner />
                
                : (
                    <>


                    {isEmpty ? 
                    
                        <>

                            <TableHeader 
                                columnsFilters={columnFilters}
                                setColumnFilters={setColumnFilters}
                            />    
                            <Empty 
                                description="Nenhum consultor foi encontrado"
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
                        
                                    <Pagination table={table}/>



                            </>

                        )
                
                    }
                        
                       
                        
                        
                        </>


                )
            
            
            
                }
                

 

                </TableWrapper>



    );
}