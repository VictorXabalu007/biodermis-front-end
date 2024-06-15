import { useQuery } from "@tanstack/react-query";
import { getWithdraw } from "../service/getWithdraw";
import { useConsultorData } from "../../Consultors/hooks/useConsultorData";
import { FilterDateConstraints, RefinedRangeDate, useRangeDate } from "../../../context/RangeDate/RangeDateContext";
import { useCallback, useEffect, useState } from "react";
import { WithDrawal } from "../util/withdrawalData";
import { getTotalBalance } from "../service/getTotalBalance";
import { updateBalance } from "../service/updateBalance";



export const useWithdrawData = ({ enableFilterDate = true }: FilterDateConstraints = {}) => {

    const {getConsultorName} = useConsultorData();

    const {state, getDates} = useRangeDate();
    const [dates, setDates] = useState<RefinedRangeDate>();

    const {data:balance} = useQuery({
        queryKey: ['balance'],
        queryFn: getTotalBalance
    })

    const [accessBalance, setBalance] = useState({
        saldodisp: "0"
    });

    useEffect(()=>{

        

        if(balance){
            setBalance(balance)
        }

    
    },[balance])
    
    
    useEffect(()=> {

        const {endDate, startDate} = getDates(state);

        setDates({endDate, startDate});
        
    },[state.rangeDate]);


    const fetchBalance = useCallback(() => (async ()  => {
        await updateBalance();
    }),[])

    useEffect(()=> {

        fetchBalance();

    },[fetchBalance]);

    const {data:withdraw,isLoading} = useQuery({
        queryKey: ['withdraw'],
        queryFn: async ()=> {


            const data = await getWithdraw();
            const newData = data.map(d => ({
                ...d,
                nome_consultor: getConsultorName(d.consultor_id),
                saldo_disp: accessBalance.saldodisp
            }))

            return newData;

        },
    })

    
    const [data, setData] = useState<WithDrawal[]>([]);

   console.log(data);
   

    useEffect(() => {


        if (enableFilterDate && dates && dates.startDate && dates.endDate) {
            const start = new Date(dates.startDate.split('/').reverse().join('-'));
            const end = new Date(dates.endDate.split('/').reverse().join('-'));

            const filteredData = withdraw?.filter((d: any) => {
                const datasaque = new Date(d.datasaque.split('/').reverse().join('-'));
                return datasaque >= start && datasaque <= end;
            }) || [];

            setData(filteredData);

        } else if (withdraw) {
            setData(withdraw);
        }
        
    }, [dates, withdraw]);

    useEffect(()=> {

        if(withdraw){
            setData(withdraw)
        }

    },[withdraw]);
    

    const isWithdrawEmpty = () => {
        return data.length === 0;
    }

    const getWithdrawDateById = (id:number) => {

        return data?.find(r => r.id === id)?.datasaque || 'sem data para este saque'

    }

    return {
        data,
        setData,
        isLoading,
        isWithdrawEmpty,
        getConsultorName,
        getWithdrawDateById
    }



}