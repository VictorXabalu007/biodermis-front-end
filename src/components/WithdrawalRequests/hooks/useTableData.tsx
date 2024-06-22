import { ColumnFilter, createColumnHelper } from "@tanstack/react-table";

import { NumericFormatter } from "../../shared/Formatter/NumericFormatter";
import { buildPaymentStatus } from "../functions/buildPaymentStatus";
import { useEffect, useMemo, useState } from "react";
import { TableSorterTitle } from "../../shared/Table/components/TableSorterTitle";
import { useWithdrawData } from "./useWithdrawData";
import { WithDrawal } from "../util/withdrawalData";
import { useConsultorData } from "../../Consultors/hooks/useConsultorData";
import { MiniImage } from "../../shared/Image/UserImage/miniImage";
import { Flex } from "antd";


const columnHelper = createColumnHelper<WithDrawal>();

export const useTableData = () => {

    const {data, isLoading, getConsultorName,accessBalance} = useWithdrawData();
    const {getConsultorImageById} = useConsultorData();

    const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
    const [sorting,setSorting] = useState<any[]>([]);


    const [withDrawData, setWithdrawData] = useState<WithDrawal[]>([]);

    useEffect(()=> {

        if(data) {


            setWithdrawData(data.map(d => ({
                ...d,
                nome_consultor: getConsultorName(d.consultor_id),
                saldo_disp: accessBalance.saldodisp
            })))

        }

  

    },[data])

    const columns = useMemo(() => [
        columnHelper.accessor('consultor_id',{
            id: 'userImage',
            header: ()=> <div>#</div>,
            cell: ({getValue}) => {
                return (

                    <Flex justify="center" align="center">
                        <MiniImage 
                            style={{
                                maxWidth: '30px'
                            }}
                            src={getConsultorImageById(getValue()) as string}
                        />
                    </Flex>
                )
            }
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
        data:withDrawData,
        sorting,
        columnFilters,
        setSorting,
        setColumnFilters,
        isLoading
    }

}