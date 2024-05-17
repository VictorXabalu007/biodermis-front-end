
import {  Users, usersData } from "./util/usersData"
import { TableActions } from "./components/TableActions.tsx"
import { ArrowUpDownIcon } from "../../../shared/Icon/ArrowUpDownIcon/index.tsx"
import { NameItem } from "../../../shared/Image/NameItem/NameItem.tsx"
import { TableWrapper } from "../../../shared/Table/components/TableWrapper.tsx"
import { TableHeader } from "../TableHeader/TableHeader.tsx"
import { ColumnFilter, createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import { useState } from "react"
import * as C from '../../../../styles/TableStyles/styles'



const columnsHelper = createColumnHelper<Users>();

const columns = [
    columnsHelper.accessor('name', {
        header: () => <div className="flex gap-2">Nomes <ArrowUpDownIcon /></div>,
        cell: (name) => <NameItem name={name.getValue()} />
    }),
    columnsHelper.accessor('email', {
        header: () => <p>Email</p>,
        cell: (email) => <p>{email.getValue()}</p>
    }),
    columnsHelper.accessor('phone', {
        header: () => <p>Telefone</p> ,
        cell: (phone) => <p>{phone.getValue()}</p>
    }),
    columnsHelper.accessor('userType', {
        header: () => <p>Tipo</p> ,
        cell: (userType) => <p>{userType.getValue()}</p>
    }),
    columnsHelper.accessor('actions', {
        header: () => <p>Ações</p> ,
        cell: TableActions 
    }),
]

export const UsersTable = () => {


    const [data, _] = useState(usersData);
    const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);

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
                <thead 
                className="bg-gray-neutral-200" >
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
                </thead>

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


        </TableWrapper>

    )

}