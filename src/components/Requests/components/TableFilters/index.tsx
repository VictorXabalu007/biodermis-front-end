
import { IoFilter } from "react-icons/io5";
import { daysOptions, deliveryOptions, sellChannelOptions, statusOptions } from "./util/selectOptions";

import React from "react";
import Select from 'react-select';
import { SearchIcon } from "../../../shared/Icon/SearchIcon";
import { Input } from "../../../shared/Input/Input";
import { Button } from "../../../shared/Button";
import { TableFiltersProps } from "../../../../@types/Filters/TableFilterProps";



export const TableFilters = ({
  columnsFilters,
  setColumnFilters,
}: TableFiltersProps) => {

  const requestsName = columnsFilters.find((f) => f.id === "requests")?.value || "";

  const onFilterChange = (id:string,value:any) => setColumnFilters(prev => (
    prev.filter(f=> f.id !== id).concat({id,value})
  ));


  const handleStatusChange = (status: { value: string; label: string } | null) => {
    
    onFilterChange('deliveryStatus', status?.value);

  };

  return (
    
    <div className="flex flex-col gap-2 py-5">
      <div className="flex flex-wrap gap-3 w-full">
        <Input.System
          className="lg:w-[350px]"
          placeholder="Buscar pedidos"
          icon={<SearchIcon />}
          value={requestsName as string}
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=> {
            onFilterChange('requests',e.target.value)
          }}
        />

        <Button.Root className="py-3 lg:w-[200px]">
          <Button.Wrapper className="flex-row-reverse">
            <Button.Icon icon={IoFilter} />
            <Button.Content content="Filtros avançados" />
          </Button.Wrapper>
        </Button.Root>
      </div>

      <div className="flex items-center flex-wrap gap-4">


                    <Select 
                        className="flex-1 md:flex-none"
                        options={daysOptions}
                        defaultValue={daysOptions[0]}
                    
                    />

                    <Select 
                        className="flex-1 md:flex-none"
                        options={deliveryOptions}
                        onChange={handleStatusChange}
                        defaultValue={deliveryOptions[0]}
                      
                    />

                    <Select 
                        className="flex-1 md:flex-none"
                        options={statusOptions}
                        defaultValue={statusOptions[0]}
                      
                    />

                    <Select 
                        className="flex-1 md:flex-none"
                        options={sellChannelOptions}
                        defaultValue={sellChannelOptions[0]}
                      
                    />

                   
                   

        </div>

    </div>
  );
};
