import { useEffect, useState } from "react";
import { format } from "date-fns";
import { RangeDateActions, useRangeDate } from "../../context/RangeDate/RangeDateContext";
import { useRequestsData } from "./useRequestsData";



type Props = {
  
    setFilteredData:React.Dispatch<React.SetStateAction<Requests[]>>

}

export const useRequestTableFilters = ({
    setFilteredData,
}:Props) => {

    const {data:inititalData} = useRequestsData();

    const handlePaymentStatusChange = (status: string) => {

        if(status === "") {
          setFilteredData(inititalData);
        } else {
          const filtered = inititalData.filter((d) => d.statuspag === status);
          setFilteredData(filtered);
        }

      };
    
      const handleOrderStatusChange = (status: string) => {
        if(status === "") {
          setFilteredData(inititalData);
        } else {
          const filtered = inititalData.filter((d) => d.statusentrega === status);
          setFilteredData(filtered);
        }

      };
    
      const { dispatch } = useRangeDate();
    
      const [showFilters, setShowFilters] = useState(false);
    
      const handleOpenFilters = () => {
        
        setShowFilters(!showFilters);
        
      };
    
      const [dateRange, setDateRange] = useState<[string, string]>(["", ""]);
    
      const handleDaysChange = (days: string) => {
        if (days) {
          const daysCount = parseInt(days);
    
          const endDate = new Date();
          const startDate = new Date();
          startDate.setDate(startDate.getDate() - daysCount);
    
          const formattedEndDate = format(endDate, "dd/MM/yyyy");
          const formattedStartDate = format(startDate, "dd/MM/yyyy");
    
          setDateRange([formattedStartDate, formattedEndDate]);
        }
      };
    
      const handleSellChannelChange = (
        channel: number
      ) => {
        if(channel === 0) {
          setFilteredData(inititalData);
        } else {
          const filtered = inititalData.filter((d) => d.formapag_id === channel);
          setFilteredData(filtered);
        }
      };
    
      useEffect(() => {
        if (dateRange) {
          dispatch({
            type: RangeDateActions.setRangeDate,
            payload: { rangeDate: dateRange },
          });
        }

      }, [dateRange]);

      return {
        handlePaymentStatusChange,
        handleOrderStatusChange,
        handleOpenFilters,
        showFilters,
        handleDaysChange,
        handleSellChannelChange,
        setShowFilters
      }
 
}
