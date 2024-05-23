
import {flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable} from '@tanstack/react-table'
import * as C from '../../../../styles/TableStyles/styles'
import { TableWrapper } from "../../../shared/Table/components/TableWrapper";
import { TableHeader } from "../TableHeader";
import { TableFilters } from "../TableFilters";
import { useTableData } from "../hooks/useTableData";
import { Pagination } from '../../../shared/Pagination';


export const RequestsTable = () => {

    const {
        columns, 
        data, 
        columnFilters,
        setColumnFilters
    } = useTableData()

    const table = useReactTable({
        data,
        columns,
        debugTable: true,
        state: {
            columnFilters,
        },
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        columnResizeMode: "onChange",

    });

    
    return (

        <TableWrapper>
            
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
                                        <C.Th key={header.id}>
                                            <div className="mx-3">
                                                {flexRender(header.column.columnDef.header,
                                                    header.getContext())}
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