import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { getMovimentations } from "../../service/getMovimentations"
import { useRequestsData } from "../../components/Requests/hooks/useRequestsData"
import { useWithdrawData } from "../../components/WithdrawalRequests/hooks/useWithdrawData"
import { RefinedRangeDate, useRangeDate } from "../../context/RangeDate/RangeDateContext"


export type MovimentationType = {
    id:number,
    tipo: 'entrada' | 'saída',
    valor:string,
    saque_id: number | null,
    pedido_id:number | null
}

export const useMovimentationData = () => {


    const {data, isLoading} = useQuery({
        queryKey: ['movimentations'],
        queryFn: getMovimentations
    })

    const [movimentations, setMovimentations] = useState<MovimentationType[]>([]);
    const {data:requests,getRequestDateById} = useRequestsData();
    const {data:withdraw, getWithdrawDateById} = useWithdrawData();


    const [dates, setDates] = useState<RefinedRangeDate>();
        
    const {state, getDates} = useRangeDate();

    useEffect(()=> {

        const {endDate, startDate} = getDates(state);

        setDates({endDate, startDate});

        
    },[state.rangeDate]);
    
    useEffect(()=> {

        if(data) {
            setMovimentations(data)
        };

    },[data])

    const parseDate = (dateString:string) => {
        const [day, month, year] = dateString.split('/');
        return new Date(`${year}-${month}-${day}`);
      };

    const calculateMonthlyTotals = (data: any[], monthKey: string) => {
        const totals: { [key: string]: { total: number, items: any[] } } = {};
    
    
        data.forEach(item => {
            const month = item[monthKey];
            if (!totals[month]) {
                totals[month] = { total: 0, items: [] };
            }
            totals[month].total += item.valor;
            totals[month].items.push(item);
        });

        
        return Object.keys(totals).map(month => ({
            month: parseInt(month),
            total: totals[month].total,
            monthData: totals[month].items
        }));
    };

    const getInputData = () => {

        
        const inputData = movimentations.filter(m => m.tipo === "entrada").map(d => {
            
            const mes_entrada = getRequestDateById(d.pedido_id);
            const parsedDate = parseDate(mes_entrada);

            return {
            ...d,
            data_entrada: getRequestDateById(d.pedido_id),
            mes_entrada:parsedDate.getMonth(),
            valor: parseFloat(d.valor) 

            }
    
    })
    
        if (dates && dates.startDate && dates.endDate) {
            const start = new Date(dates.startDate.split('/').reverse().join('-'));
            const end = new Date(dates.endDate.split('/').reverse().join('-'));
    
            const filteredData = inputData.filter(d => {
                const dataEntrada = new Date(d.data_entrada.split('/').reverse().join('-'));
                return dataEntrada >= start && dataEntrada <= end;
            }) || [];
    
            return calculateMonthlyTotals(filteredData, 'mes_entrada');
        }
        

        return calculateMonthlyTotals(inputData, 'mes_entrada');
    };
    
    const getOutputData = () => {
        const outputData = movimentations.filter(m => m.tipo === 'saída').map(d => {
            
            const mes_saida = getRequestDateById(d.pedido_id);
            const parsedDate = parseDate(mes_saida);
            
            return {
            ...d,
            data_saida: getWithdrawDateById(d.id),
            mes_saida: parsedDate.getMonth(),
            valor: parseFloat(d.valor) 
        }})
    
        if (dates && dates.startDate && dates.endDate) {
            const start = new Date(dates.startDate.split('/').reverse().join('-'));
            const end = new Date(dates.endDate.split('/').reverse().join('-'));
    
            const filteredData = outputData.filter(d => {
                const dataSaida = new Date(d.data_saida.split('/').reverse().join('-'));
                return dataSaida >= start && dataSaida <= end;
            }) || [];
    
            return calculateMonthlyTotals(filteredData, 'mes_saida');
        }
    
        return calculateMonthlyTotals(outputData, 'mes_saida');
    };



    const getDateOfRequest = (id:number | null) => {


        const date = requests.find(r => r.id === id)?.datapedido || 'Sem data disponível';
        return date;

    }

    const getDateOfWithDrawal = (id:number | null) => {


        const date = withdraw.find(r => r.id === id)?.datasaque || 'Sem data disponível';
        return date;

    }

    const getNameOfRequest = (id:number | null) => {


        const date = requests.find(r => r.id === id)?.modelo || 'Sem modelo disponível';
        return date;


    }

    const getNameOfWithdraw = (id:number | null) => {


        const date = withdraw.find(r => r.id === id)?.nome_consultor || 'Sem modelo disponível';
        return date;


    }

    return {
        movimentations,
        isLoading,
        getInputData,
        getOutputData,
        getDateOfRequest,
        getNameOfRequest,
        getDateOfWithDrawal,
        getNameOfWithdraw,


    }


}