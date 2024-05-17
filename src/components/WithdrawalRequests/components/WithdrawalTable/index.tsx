
import { WithDrawal, withdrawalData } from "./util/withdrawalData"
import { ArrowUpDownIcon } from "../../../shared/Icon/ArrowUpDownIcon"
import { NameItem } from "../../../shared/Image/NameItem/NameItem"
import { NumericFormatter } from "../../../shared/Formatter/NumericFormatter"
import { buildPaymentStatus } from "./functions/buildPaymentStatus"
import { TableWrapper } from "../../../shared/Table/components/TableWrapper"
import { TableHeader } from "../TableHeader/TableHeader"
import { ColumnFilter, createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import * as C from '../../../../styles/TableStyles/styles'
import { useState } from "react"

const columnHelper = createColumnHelper<WithDrawal>();

const columns = [
    columnHelper.accessor('name', {
        header: () => <div className="flex gap-2">Nomes <ArrowUpDownIcon /></div>,
        cell: (name) => <NameItem name={name.getValue()} />
    }),
    columnHelper.accessor('totalValueCurrent', {
        header: () => <p>Valor total em conta</p>,
        cell: (value) => <NumericFormatter value={value.getValue()} />,

      
    }),
    columnHelper.accessor('avaliableWithdrawal', {
        header: () => <p>Disponivel para saque</p>,
        cell: (value) => <NumericFormatter value={value.getValue()} />
    }),
    columnHelper.accessor('solicitedValue', {
        header: () => <p>Valor solicitado</p>,
        cell: (value) => <NumericFormatter value={value.getValue()} />
    }),
    columnHelper.accessor('paymentStatus', {
        header: () =><p>Status pagamento</p>,
        cell: (status) => buildPaymentStatus(status.getValue())
    }),
]

export const WithdrawalTable = () => {

 

    const [data, _] = useState(withdrawalData);
    const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
    const [sorting,setSorting] = useState<any[]>([]);

    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
            sorting: sorting
        },
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getCoreRowModel:getCoreRowModel(),
        debugTable: true,
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting
      
    });


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
                                <C.Th key={header.id} 
                                onClick={header.column.getToggleSortingHandler()}
                                >
                                    <div className="mx-3 flex">
                                        {flexRender(header.column.columnDef.header,
                                            header.getContext())}
                                                                             
                                            {
                                               header.column.getIsSorted() === 'asc' ? '⬆️' :
                                               header.column.getIsSorted() === 'desc' ? '⬇️' :
                                               null
                                            }
                                        
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