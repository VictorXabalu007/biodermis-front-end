
import { IoFilter } from "react-icons/io5";
import { daysOptions, deliveryOptions, sellChannelOptions, statusOptions } from "./util/selectOptions";

import React, { useEffect, useState } from "react";

import { SearchIcon } from "../../../shared/Icon/SearchIcon";
import { Input } from "../../../shared/Input/Input";
import { Button } from "../../../shared/Button";
import { TableFiltersProps } from "../../../../@types/Filters/TableFilterProps";
import { MdOutlineCancelPresentation } from "react-icons/md";
import Select from "../../../shared/Input/Select";
import { format } from 'date-fns';
import { RangeDateActions, useRangeDate } from "../../../../context/RangeDate/RangeDateContext";


export const TableFilters = ({
  
  columnsFilters,
  setColumnFilters,

}: TableFiltersProps) => {

  const requestsName = columnsFilters.find((f) => f.id === "id")?.value || "";

  const onFilterChange = (id:string,value:any) => setColumnFilters(prev => (
    prev.filter(f=> f.id !== id).concat({id,value})
  ));

  const handleOrderStatusChange = (status: { value: string; label: string } | null) => {
    
    onFilterChange('statusentrega', status?.value);

  };

  const {dispatch} = useRangeDate();

  const [showFilters, setShowFilters] = useState(false);

  const handleClick = () => {

    setShowFilters(!showFilters);

  }

  const [dateRange, setDateRange] = useState<[string,string]>(['', '']);

  useEffect(()=> {

    
    if(showFilters === false) {
      setColumnFilters([]);
    }

  },[showFilters])

  const handleDaysChange = (days: { value: string; label: string } | null) => {

     if (days) {

      const daysCount = parseInt(days.value);

      
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - daysCount);

  
      const formattedEndDate = format(endDate, 'dd/MM/yyyy');
      const formattedStartDate = format(startDate, 'dd/MM/yyyy');


      setDateRange([formattedStartDate, formattedEndDate])

    

    } 

  }

  useEffect(()=> {

    if(dateRange){
        dispatch({
          type: RangeDateActions.setRangeDate,
          payload: {rangeDate: dateRange},
        })
    }

  },[dateRange]);

  const handlePaymentStatusChange = (status: { value: string; label: string } | null) => {

    onFilterChange('statuspag', status?.value);

  }


  return (
    
    <div className="flex flex-col gap-2 py-5">
      <div className="flex flex-wrap gap-3 w-full">

        <Input.System
          className="lg:w-[350px]"
          placeholder="Buscar pedidos"
          suffix={<SearchIcon />}
          value={requestsName as string}
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=> {
            onFilterChange('id',e.target.value)
          }}
        />

        <Button.Root onClick={handleClick} className="py-3 lg:w-[200px]">
          <Button.Wrapper className="flex-row-reverse">
            <Button.Icon icon={!showFilters ? IoFilter : MdOutlineCancelPresentation  } />
            <Button.Content content={!showFilters ? "Filtros avançados" : 'Remover Filtros'} />
          </Button.Wrapper>
        </Button.Root>
      </div>

      {showFilters &&
      
        <div className="flex w-full items-center flex-wrap gap-4">


                      <Select 
                          className="w-full md:w-auto"
                          options={daysOptions}
                          defaultValue={daysOptions[0]}
                          // @ts-ignore
                          onChange={handleDaysChange}
                      
                      />

                      <Select 
                          className="w-full md:w-[200px]"
                          options={deliveryOptions}
                          // @ts-ignore
                          onChange={handleOrderStatusChange}
                          defaultValue={deliveryOptions[0]}
                        
                      />

                      <Select 
                          className="w-full md:w-[200px]"
                          options={statusOptions}
                          defaultValue={statusOptions[0]}
                          // @ts-ignore
                          onChange={handlePaymentStatusChange}
                        
                      />

                      <Select 
                          className="w-full md:w-auto"
                          options={sellChannelOptions}
                          defaultValue={sellChannelOptions[0]}
                        
                      />

                    
          </div>
      
      
      
      
      
      
      }


    </div>
  );
};
