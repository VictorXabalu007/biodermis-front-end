import { ColumnFilter, createColumnHelper } from "@tanstack/react-table";
import { WithDrawal, withdrawalData } from "../components/WithdrawalTable/util/withdrawalData";
import { NameItem } from "../../shared/Image/NameItem/NameItem";
import { ArrowUpDownIcon } from "../../shared/Icon/ArrowUpDownIcon";
import { NumericFormatter } from "../../shared/Formatter/NumericFormatter";
import { buildPaymentStatus } from "../functions/buildPaymentStatus";
import { useMemo, useState } from "react";



const columnHelper = createColumnHelper<WithDrawal>();

export const useTableData = () => {

    const [data, _] = useState(withdrawalData);
    const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
    const [sorting,setSorting] = useState<any[]>([]);

    const columns = useMemo(() => [
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
    ],[]);

    return {
        columns,
        data,
        sorting,
        columnFilters,
        setSorting,
        setColumnFilters
    }

}