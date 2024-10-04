
import { useEffect, useState } from "react";
import { useWithdrawData } from "./useWithdrawData";


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