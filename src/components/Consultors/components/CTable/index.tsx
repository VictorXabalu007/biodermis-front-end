
import { Consultors, consultorsData } from "./util/consultorsData";
import { ArrowUpDownIcon } from "../../../shared/Icon/ArrowUpDownIcon";
import { buildPodium } from "../../../shared/Table/functions/buildPodium";
import { Text } from "../../../shared/Text";
import { IoIosArrowUp } from "react-icons/io";
import { NameItem } from "../../../shared/Image/NameItem/NameItem";
import { NumericFormatter } from "../../../shared/Formatter/NumericFormatter";
import { buildStatus } from "./util/functions/buildStatus";
import { TableActions } from "./util/components/TableActions";
import { TableWrapper } from "../../../shared/Table/components/TableWrapper";
import { TableHeader } from "../TableHeader";
import { ColumnFilter, createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import * as C from '../../../../styles/TableStyles/styles'


const columnHelper = createColumnHelper<Consultors>();

const columns = [

    columnHelper.accessor('tops', {
        header: () => <div className="flex gap-2">Tops <ArrowUpDownIcon /> </div>,
        cell: (cell) => {

            return (

                    cell.getValue() === '1' || cell.getValue() === '2' || cell.getValue() === '3' ?
                    (buildPodium(cell.getValue())) : (

                    <div className="flex px-2 gap-2 items-center">

                        <Text.Root className="text-purple-solid-950">
                            <Text.Content content={cell.getValue()} />
                        </Text.Root>

                        <IoIosArrowUp className="text-lg text-green-flat" />

                    </div>

                    )

            );
        }
    }),
    columnHelper.accessor('name', {
        header: () => <div className="flex gap-2">Nomes <ArrowUpDownIcon /> </div>,
        cell: (name) => <NameItem name={name.getValue()} />
    }),
    columnHelper.accessor('email', {
        header: () => <p>Email</p>,
        cell: (email) => <p> {email.getValue()} </p>
    }),
    columnHelper.accessor('phone', {
        header: () => <p>Telefone</p>,
        cell: (phone) => <p> {phone.getValue()} </p>
    }),
    columnHelper.accessor('totalFatured', {
        header: () => <div className="flex gap-2">Total faturado <ArrowUpDownIcon /></div>,
        cell: (total) => (
                <NumericFormatter
                    value={total.getValue()}
                />
            )
    }),
    columnHelper.accessor('status', {
        header: () => <p>Status</p>,
        cell: (status) => (
            buildStatus(status.getValue())
        )
    }),
    columnHelper.accessor('actions', {
        header: () => <p>Ações</p>,
        cell: TableActions
    }),
]

export const ConsultorsTable = () => {

    const [consultors, _] = useState(consultorsData);
    const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);

    const table = useReactTable({
        data: consultors,
        columns,
        debugTable: true,
        state: {
            columnFilters,
        },
        getCoreRowModel: getCoreRowModel(),
        columnResizeMode: 'onChange',
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
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
                        className="bg-gray-neutral-200" 
                        style={{width: table.getTotalSize()}}
                        >
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



    );
}