import { useQuery } from "@tanstack/react-query";
import { Requests } from "../@types/Requests";
import { useConsultorData } from "../../Consultors/hooks/useConsultorData";
import { useEffect, useState } from "react";
import {
  FilterDateConstraints,
  RefinedRangeDate,
  useRangeDate,
} from "../../../context/RangeDate/RangeDateContext";
import { getHeaders } from "../../../service/getHeaders";
import { api } from "../../../service/connection";
import { parseDate } from "../../../functions/Date/parseData";
import { ProductsType } from "../../Products/service/getProducts";
import {
  parse,
  getMonth,
  getYear,
} from "date-fns";
import { useProductsData } from "../../Products/hooks/useProductsData";
import { normalizeText } from "../../../functions/normalize-text";


export type RequestStatusChange = "no change" | "increase" | "decrease";

export const useRequestsData = ({
  enableFilterDate = true,
}: FilterDateConstraints = {}) => {

  const { getConsultorName } = useConsultorData();

  const now = new Date();
  const currentMonth = getMonth(now);
  const currentYear = getYear(now);

  const {
    data: requests,
    isError,
    isLoading:requestsLoading,
  } = useQuery<Requests[]>({
    queryKey: ["requests_products"],
    queryFn: async () => {
      const headers = getHeaders();

      const req = await api.get<Requests[]>("/pedidos/0", {
        headers,
      });


      return req.data
      
    },

  });

  const {products,isLoading:productsLoading} = useProductsData();


  const isLoading = productsLoading || requestsLoading

  const { state, getDates } = useRangeDate();
  const [dates, setDates] = useState<RefinedRangeDate>();
  const [data, setData] = useState<Requests[]>([]);
  
  useEffect(() => {

    if (requests && products) {

      const newData = requests.sort((a, b) => {
        const dateA = parseDate(a.datapedido);
        const dateB = parseDate(b.datapedido);
        return dateB.getTime() - dateA.getTime();
      }).map(req => {
        
        
        const reqProducts = req.produtos_ids
        .map((orderProduct) => products.find((p) => p.id === orderProduct.id))
        .map((p) => {
          if(p?.imagens) {
            const path = p?.imagens[0].replace(/\\/g, "\\") 
            return {
              ...p,
              imagePath: (URL + "/" + path) ,
            };
          } 
   
        }) 

        const notEmptyProducts = reqProducts.every(val => val===undefined) ? [] : reqProducts as ProductsType[]
        
        
        return {
        ...req,
          nomeCliente: req.nomeCliente ? req.nomeCliente : "Cliente não encontrado",
          products: notEmptyProducts,
   
      }})


      setData(newData);

    }

    
    
  }, [requests,products]);



  const getRequestDataOfConsultorId = (id: number) => {

    return data.filter((d) => d.consultor_id === id);

  };

  useEffect(() => {

    const { endDate, startDate } = getDates(state);

    setDates({ endDate, startDate });

  }, [state.rangeDate]);

  useEffect(() => {

    if (enableFilterDate && dates && dates.startDate && dates.endDate) {
      const start = new Date(dates.startDate.split("/").reverse().join("-"));
      const end = new Date(dates.endDate.split("/").reverse().join("-"));

      const filteredData =
        requests?.filter((d: any) => {
          const datapedido = new Date(
            d.datapedido.split("/").reverse().join("-")
          );
          return datapedido >= start && datapedido <= end;
        }) || [];

      setData(filteredData);
    } else if (requests) {
      setData(prev => prev);
    }

  }, [dates, requests]);

  const getSellPercentualChange = () => {

    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const currentMonthSales = data.filter((d) => {
      const datapedido = new Date(d.datapedido.split("/").reverse().join("-"));
      return (
        datapedido.getMonth() === currentMonth &&
        datapedido.getFullYear() === currentYear
      );
    }).length;

    const lastMonthSales = data.filter((d) => {
      const datapedido = new Date(d.datapedido.split("/").reverse().join("-"));
      return (
        datapedido.getMonth() === lastMonth &&
        datapedido.getFullYear() === lastMonthYear
      );
    }).length;

    if (lastMonthSales === 0) {
      return currentMonthSales === 0 ? 0 : 100;
    }

    const change =
      ((currentMonthSales - lastMonthSales) / lastMonthSales) * 100;
    return change;
  };

  const getSellStatusChange = (): RequestStatusChange => {

    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const currentMonthSales = data.filter((d) => {
      const datapedido = new Date(d.datapedido.split("/").reverse().join("-"));
      return (
        datapedido.getMonth() === currentMonth &&
        datapedido.getFullYear() === currentYear
      );
    }).length;

    const lastMonthSales = data.filter((d) => {
      const datapedido = new Date(d.datapedido.split("/").reverse().join("-"));
      return (
        datapedido.getMonth() === lastMonth &&
        datapedido.getFullYear() === lastMonthYear
      );
    }).length;

    if (lastMonthSales === 0) {
      return currentMonthSales === 0 ? "no change" : "increase";
    }

    return currentMonthSales > lastMonthSales ? "increase" : "decrease";
  };

  const getRequestOrderPercentChange = () => {

    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const currentMonthOrders = data.filter((d) => {
      const datapedido = new Date(d.datapedido.split("/").reverse().join("-"));
      return (
        datapedido.getMonth() === currentMonth &&
        datapedido.getFullYear() === currentYear
      );
    }).length;

    const lastMonthOrders = data.filter((d) => {
      const datapedido = new Date(d.datapedido.split("/").reverse().join("-"));
      return (
        datapedido.getMonth() === lastMonth &&
        datapedido.getFullYear() === lastMonthYear
      );
    }).length;

    if (lastMonthOrders === 0) {
      return currentMonthOrders === 0 ? 0 : 100;
    }

    const change =
      ((currentMonthOrders - lastMonthOrders) / lastMonthOrders) * 100;
    return change;
  };

  const getRequestOrderStatusChange = () => {

    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const currentMonthOrders = data.filter((d) => {
      const datapedido = new Date(d.datapedido.split("/").reverse().join("-"));
      return (
        datapedido.getMonth() === currentMonth &&
        datapedido.getFullYear() === currentYear
      );
    }).length;

    const lastMonthOrders = data.filter((d) => {
      const datapedido = new Date(d.datapedido.split("/").reverse().join("-"));
      return (
        datapedido.getMonth() === lastMonth &&
        datapedido.getFullYear() === lastMonthYear
      );
    }).length;

    if (lastMonthOrders === 0) {
      return currentMonthOrders === 0 ? "no change" : "increase";
    }

    return currentMonthOrders > lastMonthOrders ? "increase" : "decrease";
  };

  const getRequestDateById = (id: number | null) => {
    return (
      data?.find((r) => r.id === id)?.datapedido || "sem data para este pedido"
    );
  };

  const getTotalSells = () => {


    const currentMonthSales = data.filter((d) => {

      return (
        normalizeText(d.modelo) === "venda"
      );
      
    });

    return currentMonthSales.length;
  };

  const getTotalPayments = () => {
    let totalPayments = 0;
    let totalPaymentCount = 0;

    data.forEach((d) => {
      totalPayments += parseFloat(d.valor);
      totalPaymentCount++;
    });

    const percentualTotal = (totalPayments / totalPaymentCount) * 100;

    return {
      totalPayments,
      percentualTotal,
    };
  };

  const getTotalApprovedPayments = () => {
    let totalPaymentsApproved = 0;
    let totalApprovedPaymentsCount = 0;

    data.forEach((d) => {
      if (d.statuspag === "realizado") {
        totalPaymentsApproved += parseFloat(d.valor);
        totalApprovedPaymentsCount++;
      }
    });

    const percentualApprovedPayments =
      (totalPaymentsApproved / getTotalPayments().totalPayments) * 100;

    return {
      totalPayments: totalPaymentsApproved,
      percentualTotal: percentualApprovedPayments,
    };
  };

  const getTotalPendingPayments = () => {
    let totalPaymentsPending = 0;
    let totalPendingPaymentsCount = 0;

    data.forEach((d) => {
      if (d.statuspag === "aguardando") {
        totalPaymentsPending += parseFloat(d.valor);
        totalPendingPaymentsCount++;
      }
    });

    const percentualPendingPayments =
      (totalPaymentsPending / getTotalPayments().totalPayments) * 100;

    return {
      totalPayments: totalPaymentsPending,
      percentualTotal: percentualPendingPayments,
    };
  };

  const getTotalOrders = () => {


    const currentMonthSales = data.filter((d) => parse(d.datapedido, "dd/MM/yyyy", new Date()));

    return currentMonthSales.length;

  };


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
    getRequestDataOfConsultorId,
    getSellStatusChange,
    getRequestOrderStatusChange,
    getTotalOrders,
  };
};
