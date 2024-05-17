import { useNavigate } from "react-router-dom";
import { TableHeaderWrapper } from "../../../shared/Table/components/TableHeaderWrapper";
import { Input } from "../../../shared/Input/Input";
import Select from 'react-select';
import { SearchIcon } from "../../../shared/Icon/SearchIcon";
import { InputRangePicker } from "../../../shared/Input/RangePicker";
import { Button } from "../../../shared/Button";
import { REGISTER_CONSULTOR } from "../../../../constants/paths/paths";
import { FaPlus } from "react-icons/fa6";
import { TableFiltersProps } from "../../../../@types/Filters/TableFilterProps";
import { userStatusOptions } from "./util/selectOptions";


export const TableHeader = ({columnsFilters, setColumnFilters}:TableFiltersProps) => {

    const navigate = useNavigate();

    const username = columnsFilters.find((f) => f.id === "name")?.value || "";

    const onFilterChange = (id:string,value:any) => setColumnFilters(prev => (
        prev.filter(f=> f.id !== id).concat({id,value})
    ));
      
    
    const handleStatusChange = (status: { value: string; label: string } | null) => {
        
        onFilterChange('status', status?.value);

    };

    return (

        <TableHeaderWrapper heading="Lista consultores">

            <div className="flex flex-wrap justify-between items-center">

                <div className="flex flex-wrap gap-2">
                    
                    <Input.Root className="lg:w-[250px] flex-1">

                        <Input.System
                        className="py-2 flex-1"
                        placeholder="Buscar"
                        icon= {<SearchIcon />}
                        value={username as string}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=> {
                          onFilterChange('name',e.target.value)
                        }}

                        />
                    
                    </Input.Root>

                    <Select 
                        className="flex-1 md:flex-none"
                        options={userStatusOptions}
                        onChange={handleStatusChange}
                        defaultValue={userStatusOptions[0]}
                    />



                </div>

                <div className="flex mt-3 xl:mt-0 flex-wrap gap-2">
                    
                    <InputRangePicker />

                    <Button.Root 
                     onClick={()=>navigate(REGISTER_CONSULTOR)}
                     className="bg-white border border-purple-solid-500 text-purple-solid-500 hover:bg-purple-solid-200 flex-1">
                        <Button.Content content="Cadastrar um consultor" />
                        <Button.Icon icon={FaPlus} />
                    </Button.Root>


                </div>

            </div>

        </TableHeaderWrapper>

    )

}
