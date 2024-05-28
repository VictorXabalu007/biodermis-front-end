import { ColumnFilter, createColumnHelper } from "@tanstack/react-table";
import { WithDrawal, withdrawalData } from "../util/withdrawalData";
import { NameItem } from "../../shared/Image/NameItem/NameItem";
import { ArrowUpDownIcon } from "../../shared/Icon/ArrowUpDownIcon";
import { NumericFormatter } from "../../shared/Formatter/NumericFormatter";
import { buildPaymentStatus } from "../functions/buildPaymentStatus";
import {  useEffect, useMemo, useState } from "react";
import { WITHDRAW } from "../../../constants/SessionStorageKeys/sessionStorageKeys";



const columnHelper = createColumnHelper<WithDrawal>();

const storageData = JSON.parse(sessionStorage.getItem(WITHDRAW) ?? '[]');

export const useTableData = () => {

    const [data, setData] = useState(storageData ?  storageData : withdrawalData);
    const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
    const [sorting,setSorting] = useState<any[]>([]);

    useEffect(()=> {

        sessionStorage.setItem(WITHDRAW,JSON.stringify(withdrawalData));
          
        if(Array.isArray(storageData)){

            setData(storageData);
       
        } 

    },[storageData]);

    console.log(data);

    const columns = useMemo(() => [
        columnHelper.accessor('name', {
            header: () => <div className="flex gap-2">Nomes <ArrowUpDownIcon /></div>,
            cell: (name) =><div className="mx-3"> <NameItem name={name.getValue()} /></div>,
            enableSorting: true,
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
            cell: ({row,getValue}) => buildPaymentStatus(getValue(), row.index)
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