import { TableFiltersProps } from "../../../../@types/Filters/TableFilterProps"
import { SearchIcon } from "../../../shared/Icon/SearchIcon"
import { Input } from "../../../shared/Input/Input"
import { InputRangePicker } from "../../../shared/Input/RangePicker"
import { TableHeaderWrapper } from "../../../shared/Table/components/TableHeaderWrapper"
import Select from 'react-select';
import { withdrawalSelectOptions } from "./util/selectOptions"


export const TableHeader = ({columnsFilters,setColumnFilters}:TableFiltersProps) => {


    const username = columnsFilters.find((f) => f.id === "name")?.value || "";

    const onFilterChange = (id:string,value:any) => setColumnFilters(prev => (
        prev.filter(f=> f.id !== id).concat({id,value})
    ));


    const handleStatusChange = (status: {value:string}| null) => {
        onFilterChange('paymentStatus', status?.value)
    }

    

    return (

        <TableHeaderWrapper heading="Pedidos de saque">

            <div className="flex flex-wrap justify-between items-center">

            <div className="flex flex-wrap gap-2">
                    
                    <Input.Root className="lg:w-[400px] w-full">

                        <Input.System
                        className="py-2"
                        placeholder="Buscar"
                        suffix= {<SearchIcon />}
                        value={username as string}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=> {
                          onFilterChange('name',e.target.value)
                        }}

                        />
                    
                    </Input.Root>

                    <Select 

                        className="w-full md:w-auto"
                        options={withdrawalSelectOptions}
                        defaultValue={withdrawalSelectOptions[0]}
                        onChange={handleStatusChange}
                       
                    />

                </div>

                <div className="flex w-full mt-2 md:mt-0 md:w-auto flex-wrap gap-2">
                
                    <InputRangePicker
                    
                    />

                </div>

            </div>

        </TableHeaderWrapper>

    )
}