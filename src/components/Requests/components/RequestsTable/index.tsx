
import {flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable} from '@tanstack/react-table'
import * as C from '../../../../styles/TableStyles/styles'
import { TableWrapper } from "../../../shared/Table/components/TableWrapper";
import { TableHeader } from "../TableHeader";
import { TableFilters } from "../TableFilters";
import { useTableData } from "../../hooks/useTableData";
import { Pagination } from '../../../shared/Pagination';
import { TableSorters } from '../../../shared/Table/components/TableSorters';
import { Spinner } from '../../../shared/Spinner';
import { validateRowSelected } from '../../../../functions/Validators/ValidateRowSelected/validateRowSelected';
import { Empty } from 'antd';


export const RequestsTable = () => {

    const {
        columns, 
        data, 
        columnFilters,
        setColumnFilters,
        sorting,
        setSorting,
        isLoading,
        contextHolder
    } = useTableData();

    const table = useReactTable({
        data,
        columns,
        debugTable: true,
        state: {
            columnFilters,
            sorting
        },
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        columnResizeMode: "onChange",
        onSortingChange: setSorting,

    });

    
    return (

        <TableWrapper>

            {contextHolder}
            {isLoading ? 
            
            <Spinner />
            
            :
            
            (

                <>

                {data.length === 0 ?
                
                    <>

                        <TableHeader />

                        <TableFilters 
                            columnsFilters={columnFilters}
                            setColumnFilters={setColumnFilters}
                        />

                        <Empty 
                            description="Nenhum dado no momento"
                        />


                    </>

                    : (

                        <>

            <TableHeader />

            <TableFilters 
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
                                        <C.Td style={validateRowSelected(row)} key={cell.id}>
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


            )}
            
      

        </TableWrapper>


    );


}