import { useEffect, useState } from "react";
import { RangeDateActions, useRangeDate } from "../../../context/RangeDate/RangeDateContext";
import { Requests } from "../@types/Requests"
import { format } from "date-fns";



type Props = {
    data:Requests[],
    setFilteredData:React.Dispatch<React.SetStateAction<Requests[]>>
    filteredData:Requests[]
}

export const useRequestTableFilters = ({
    data,
    setFilteredData,
    filteredData
}:Props) => {

    const handlePaymentStatusChange = (status: { value: string } | null) => {
        if (status?.value === "") {
          setFilteredData(data);
        } else {
          setFilteredData(filteredData.filter((d) => d.statuspag === status?.value));
        }
      };
    
      const handleOrderStatusChange = (status: { value: string } | null) => {
        if (status?.value === "") {
          setFilteredData(data);
        } else {
          setFilteredData(filteredData.filter((d) => d.statusentrega === status?.value));
        }
      };
    
      const { dispatch } = useRangeDate();
    
      const [showFilters, setShowFilters] = useState(false);
    
      const handleOpenFilters = () => {
        
        setShowFilters(!showFilters);
        
      };
    
      const [dateRange, setDateRange] = useState<[string, string]>(["", ""]);
    
      const handleDaysChange = (days: { value: string; label: string } | null) => {
        if (days) {
          const daysCount = parseInt(days.value);
    
          const endDate = new Date();
          const startDate = new Date();
          startDate.setDate(startDate.getDate() - daysCount);
    
          const formattedEndDate = format(endDate, "dd/MM/yyyy");
          const formattedStartDate = format(startDate, "dd/MM/yyyy");
    
          setDateRange([formattedStartDate, formattedEndDate]);
        }
      };
    
      const handleSellChannelChange = (
        channel: { value: string; label: string } | null
      ) => {
        if (channel?.value === "") {
          setFilteredData(data);
        } else {
          setFilteredData(
            filteredData.filter((d) => d.formapag_id === parseInt(channel!.value))
          );
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
