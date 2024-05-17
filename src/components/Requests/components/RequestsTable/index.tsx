
import { Requests, requestData } from "./util/requestsData";
import { TableActions } from "./components/TableActions";
import { buildPaymentStatus } from "./util/functions/buildPaymentStatus";
import { buildDeliveryStatus } from "./util/functions/buildDeliveryStatus";

import { buildTotalValue } from "./util/functions/buildTotalValue";
import { FaWhatsapp } from "react-icons/fa6";

import {ColumnFilter, createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable} from '@tanstack/react-table'
import { useState } from "react";
import * as C from '../../../../styles/TableStyles/styles'
import { TableWrapper } from "../../../shared/Table/components/TableWrapper";
import { TableHeader } from "../TableHeader";
import { TableFilters } from "../TableFilters";

import { ArrowUpDownIcon } from "../../../shared/Icon/ArrowUpDownIcon";
import { NumericFormatter } from "../../../shared/Formatter/NumericFormatter";

const columnHelper = createColumnHelper<Requests>();

const columns = [
    columnHelper.accessor('actions',{
        header: () => <p>Ações</p>,
        cell: TableActions,
    }),
    columnHelper.accessor('requests',{
        header: () => <div className={'flex gap-2'}>Pedidos <ArrowUpDownIcon /></div>,
        cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('buyerName',{
        header: () => <p>Nome comprador</p>,
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('consultor',{
        header: () => <p>Consultora</p>,
        cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('paymentStatus',{
        header: () => <p>Status pagamento</p>,
        cell: (info) => buildPaymentStatus(info.getValue()),
    }),

    columnHelper.accessor('deliveryStatus',{
        header: () => <p>Status de entrega</p>,
        cell: (info) => buildDeliveryStatus(info.getValue()),
    }),
    columnHelper.accessor('sellOrSupply',{
        header: () => <p>Abastecimento/Vendas</p>,
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('shippingValue',{
        header: () => <p>Valor frete</p>,
        cell: (info) =>  (
            <NumericFormatter
               value={info.getValue()}
           />
        )

    }),
    columnHelper.accessor('totalValue',{
        header: () => <p>Valor total</p>,
        cell: (info) => buildTotalValue(info.getValue().value, info.getValue().paymentType)
    }),
    columnHelper.accessor('whatsaap',{
        header: () => <p>WhatsApp</p>,
        cell: () => <FaWhatsapp className="text-2xl mx-auto text-purple-solid-600 hover:text-purple-solid-600/50" />
    }),
]

export const RequestsTable = () => {

    const [requests,_] = useState(requestData)
    const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);

    const table = useReactTable({
        data:requests,
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
                    <table>
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
                    </table>
                </C.Container>
            

        </TableWrapper>


    );


}