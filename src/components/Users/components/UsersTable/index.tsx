
import { TableWrapper } from "../../../shared/Table/components/TableWrapper.tsx"
import { TableHeader } from "../TableHeader/index.tsx"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import * as C from '../../../../styles/TableStyles/styles'
import { useTableData } from "../../hooks/useTableData.tsx"
import { Pagination } from "../../../shared/Pagination/index.tsx"

export const UsersTable = () => {


    const {columnFilters, columns, data, setColumnFilters} = useTableData();
    const table = useReactTable({

        data,
        columns,
        state:{
            columnFilters,
            
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,

    })

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

    )

}