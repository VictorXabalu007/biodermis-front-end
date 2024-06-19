import { useQuery } from "@tanstack/react-query"
import { Requests } from "../components/@types/Requests"
import { useConsultorData } from "../../Consultors/hooks/useConsultorData"
import { useEffect, useState } from "react"
import { FilterDateConstraints, RefinedRangeDate, useRangeDate } from "../../../context/RangeDate/RangeDateContext"
import { isConsultor } from "../../../functions/Validators/ValidateConsultor/isConsultor"
import { getUserData } from "../../../functions/Getters/getUser"
import { getHeaders } from "../../../service/getHeaders"
import { api } from "../../../service/connection"
import { parseDate } from "../../../functions/Date/parseData"



export const useRequestsData = ({ enableFilterDate = true }: FilterDateConstraints = {}) => {


    const {data: requests, isError, isLoading} = useQuery<Requests[]>({
        queryKey: ['requests'],
        queryFn: async ()=> {

            
            const headers = getHeaders();

            const req = await api.get<Requests[]>('/pedidos/0', {
                headers
            });

            if(isConsultor()) {
                const user = getUserData();
                const newData = req.data.filter(r => r.consultor_id === user.usuario.id);
                return newData;
            } else {

                return req.data;
            }
        

        },
    })


   
    const {state, getDates} = useRangeDate();
    const [dates, setDates] = useState<RefinedRangeDate>();
    const [data,setData] = useState<Requests[]>([])



    

    useEffect(() => {

        if (requests) {

            setData(requests.sort((a, b) => {
                const dateA = parseDate(a.datapedido);
                const dateB = parseDate(b.datapedido);
                return dateB.getTime() - dateA.getTime();
            }));
        }

        
    }, [requests]);

    
    const getRequestDataOfConsultorId = (id: number) => {
        return data.filter(d => d.consultor_id === id)
     
    };

    useEffect(()=> {

        const {endDate, startDate} = getDates(state);

        setDates({endDate, startDate});

        
    },[state.rangeDate]);
    
    const {getConsultorName} = useConsultorData();


    
    useEffect(() => {

        
        if (enableFilterDate && dates && dates.startDate && dates.endDate) {
            const start = new Date(dates.startDate.split('/').reverse().join('-'));
            const end = new Date(dates.endDate.split('/').reverse().join('-'));

            const filteredData = requests?.filter((d: any) => {
                const datapedido = new Date(d.datapedido.split('/').reverse().join('-'));
                return datapedido >= start && datapedido <= end;
            }) || [];

            setData(filteredData);

        } else if(requests) {
            setData(requests)
        }
        
    }, [dates, requests]);

    const getSellPercentualChange = () => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
    
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    
        const currentMonthSales = data.filter(d => {
          const datapedido = new Date(d.datapedido.split('/').reverse().join('-'));
          return datapedido.getMonth() === currentMonth && datapedido.getFullYear() === currentYear;
        }).length;
    
        const lastMonthSales = data.filter(d => {
          const datapedido = new Date(d.datapedido.split('/').reverse().join('-'));
          return datapedido.getMonth() === lastMonth && datapedido.getFullYear() === lastMonthYear;
        }).length;
    
        if (lastMonthSales === 0) {
          return currentMonthSales === 0 ? 0 : 100; 
        }
    
        const change = ((currentMonthSales - lastMonthSales) / lastMonthSales) * 100;
        return change;
      };
    

      const getRequestOrderPercentChange = () => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
    
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    
        const currentMonthOrders = data.filter(d => {
          const datapedido = new Date(d.datapedido.split('/').reverse().join('-'));
          return datapedido.getMonth() === currentMonth && datapedido.getFullYear() === currentYear;
        }).length;
    
        const lastMonthOrders = data.filter(d => {
          const datapedido = new Date(d.datapedido.split('/').reverse().join('-'));
          return datapedido.getMonth() === lastMonth && datapedido.getFullYear() === lastMonthYear;
        }).length;
    
        if (lastMonthOrders === 0) {
          return currentMonthOrders === 0 ? 0 : 100; 
        }
    
        const change = ((currentMonthOrders - lastMonthOrders) / lastMonthOrders) * 100;
        return change;
      };


    const getRequestDateById = (id:number | null) => {

        return data?.find(r => r.id === id)?.datapedido || 'sem data para este pedido'

    }

    const getTotalSells = () => {
        return data.reduce((total, r) => (r.modelo === 'venda' ? total + 1 : total), 0);
    };


    const getTotalPayments = () => {


        let totalPayments = 0;
        let totalPaymentCount = 0;
        
        data.forEach(d => {
            totalPayments += parseFloat(d.valor)
            totalPaymentCount++;
        });
    

        const percentualTotal = (totalPayments / totalPaymentCount) * 100;
    
        return {
            totalPayments,
            percentualTotal
        };
    
    }
    

    
    const getTotalApprovedPayments = () => {
        let totalPaymentsApproved = 0;
        let totalApprovedPaymentsCount = 0;
    
        data.forEach(d => {
            if (d.statuspag === 'realizado') {
                totalPaymentsApproved += parseFloat(d.valor);
                totalApprovedPaymentsCount++;
            }
        });
    
        const percentualApprovedPayments = (totalPaymentsApproved / getTotalPayments().totalPayments) * 100;
        
        return {
            totalPayments: totalPaymentsApproved,
            percentualTotal: percentualApprovedPayments
        };

    }
    
    const getTotalPendingPayments = () => {
    let totalPaymentsPending = 0;
    let totalPendingPaymentsCount = 0;

    data.forEach(d => {
        if (d.statuspag === 'aguardando') {
            totalPaymentsPending += parseFloat(d.valor);
            totalPendingPaymentsCount++;
        }
    });

    const percentualPendingPayments = (totalPaymentsPending / getTotalPayments().totalPayments) * 100;

    return {
        totalPayments: totalPaymentsPending,
        percentualTotal: percentualPendingPayments
    };
}


    return {

        data,
        setData,
        getConsultorName,
        isError,
        isLoading,
        getSellPercentualChange,
        getRequestDateById,
        getTotalSells,
        getTotalPayments,
        getTotalApprovedPayments,
        getTotalPendingPayments,
        getRequestOrderPercentChange,
        getRequestDataOfConsultorId

    }
}