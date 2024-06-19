import { ColumnFilter, createColumnHelper } from "@tanstack/react-table";

import { NumericFormatter } from "../../shared/Formatter/NumericFormatter";
import { buildPaymentStatus } from "../functions/buildPaymentStatus";
import { useMemo, useState } from "react";
import { TableSorterTitle } from "../../shared/Table/components/TableSorterTitle";
import { useWithdrawData } from "./useWithdrawData";
import { WithDrawal } from "../util/withdrawalData";


const columnHelper = createColumnHelper<WithDrawal>();

export const useTableData = () => {

    const {data, isLoading, getConsultorName} = useWithdrawData();


    const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
    const [sorting,setSorting] = useState<any[]>([]);



    const columns = useMemo(() => [
        columnHelper.display({
            id: 'userImage',
            header: ()=> <div>#</div>,
        }),
        columnHelper.accessor('nome_consultor', {
            header: ({header}) => <TableSorterTitle header={header} title="Nomes" />,
            cell: ({getValue}) =>getValue(),
            enableSorting: true,
        }),
        columnHelper.accessor('saldo_disp', {
            header: () => <p>Valor total em conta</p>,
            cell: (value) => <NumericFormatter value={parseFloat(value.getValue())} />,
        }),
        columnHelper.accessor('valorsaque', {
            header: () => <p>Disponivel para saque</p>,
            cell: (value) => <NumericFormatter value={parseFloat(value.getValue())} />
        }),
        columnHelper.accessor('valorresto', {
            header: () => <p>Valor solicitado</p>,
            cell: (value) => <NumericFormatter value={parseFloat(value.getValue())} />
        }),
        columnHelper.accessor('status', {
            header: () =><p>Status pagamento</p>,
            cell: ({row,getValue}) => buildPaymentStatus(getValue(), row.original)
        }),
    ],[getConsultorName]);

    return {
        columns,
        data,
        sorting,
        columnFilters,
        setSorting,
        setColumnFilters,
        isLoading
    }

}