import { ColumnFilter, createColumnHelper } from "@tanstack/react-table";
import { Requests, requestData } from "../RequestsTable/util/requestsData";
import { NumericFormatter } from "../../../shared/Formatter/NumericFormatter";
import { buildTotalValue } from "../RequestsTable/util/functions/buildTotalValue";
import { FaWhatsapp } from "react-icons/fa6";
import { buildDeliveryStatus } from "../RequestsTable/util/functions/buildDeliveryStatus";
import { buildPaymentStatus } from "../RequestsTable/util/functions/buildPaymentStatus";
import { TableActions } from "../RequestsTable/components/TableActions";
import { ArrowUpDownIcon } from "../../../shared/Icon/ArrowUpDownIcon";
import { useMemo, useState } from "react";

export const useTableData = () => {
    
    const columnHelper = createColumnHelper<Requests>();
    const [data,_] = useState(requestData)
    const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);

    const columns = useMemo(() => [

        columnHelper.accessor('actions',{
            header: () => <p>Ações</p>,
            cell: TableActions,
        }),

        columnHelper.accessor('requests',{
            header: () => <div className={'flex gap-2'}>Pedidos <ArrowUpDownIcon /></div>,
            cell: ({getValue}) => getValue(),
        }),
    
        columnHelper.accessor('buyerName',{
            header: () => <p>Nome comprador</p>,
            cell: ({getValue}) => getValue(),
        }),
        columnHelper.accessor('consultor',{
            header: () => <p>Consultora</p>,
            cell: ({getValue}) => getValue(),
        }),
    
        columnHelper.accessor('paymentStatus',{
            header: () => <p>Status pagamento</p>,
            cell: ({getValue}) => buildPaymentStatus(getValue()),
        }),
    
        columnHelper.accessor('deliveryStatus',{
            header: () => <p>Status de entrega</p>,
            cell: ({getValue}) => buildDeliveryStatus(getValue()),
        }),
        columnHelper.accessor('sellOrSupply',{
            header: () => <p>Abastecimento/Vendas</p>,
            cell: ({getValue}) => getValue(),
        }),
        columnHelper.accessor('shippingValue',{
            header: () => <p>Valor frete</p>,
            cell: ({getValue}) =>  (
                <NumericFormatter
                   value={getValue()}
               />
            )
    
        }),
        columnHelper.accessor('totalValue',{
            header: () => <p>Valor total</p>,
            cell: ({getValue}) => buildTotalValue(getValue().value, getValue().paymentType)
        }),
        columnHelper.accessor('whatsaap',{
            header: () => <p>WhatsApp</p>,
            cell: () => <FaWhatsapp className="text-2xl mx-auto text-purple-solid-600 hover:text-purple-solid-600/50" />
        }),
        
    ],[]);

    return {
        columns,
        data,
        columnFilters,
        setColumnFilters,
    };


}