
import { useEffect, useState } from "react";
import { useWithdrawData } from "./useWithdrawData";
import { WithDrawal } from "../util/withdrawalData";


export const useTableData = () => {

    const {data, isLoading, getConsultorName,accessBalance} = useWithdrawData();


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


    return {
    
        withDrawData,
        setWithdrawData,

        isLoading
    }

}