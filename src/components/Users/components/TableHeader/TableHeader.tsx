import { FaPlus } from "react-icons/fa6";
import { Button } from "../../../shared/Button";
import { SearchIcon } from "../../../shared/Icon/SearchIcon";
import { Input } from "../../../shared/Input/Input";
import { TableHeaderWrapper } from "../../../shared/Table/components/TableHeaderWrapper";
import { TableFiltersProps } from "../../../../@types/Filters/TableFilterProps";
import Select from 'react-select'
import { userSelectOptions } from "./util/selectOptions";


export const TableHeader = ({columnsFilters, setColumnFilters}:TableFiltersProps) => {


    const username = columnsFilters.find((f) => f.id === "name")?.value || "";

    const onFilterChange = (id:string,value:any) => setColumnFilters(prev => (
        prev.filter(f=> f.id !== id).concat({id,value})
    ));
      

    const handleUserTypeChange = (type: {value:string, label:string}| null) => {
        onFilterChange('userType',type?.value);
    }

    return (

        <TableHeaderWrapper 
         heading="Lista de usuários"
        >

            <div className="flex flex-wrap justify-between items-center">

                <div className="flex flex-wrap gap-2">
                        
                        <Input.Root className="lg:w-[300px] flex-1">

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
                        options={userSelectOptions}
                        defaultValue={userSelectOptions[0]}
                        className="w-[250px]"
                        onChange={handleUserTypeChange}
                        />
  
                    </div>

                    <div className="flex flex-wrap gap-2">
                    

                        <Button.Root className="bg-white border border-purple-solid-500 text-purple-solid-500 hover:bg-purple-solid-200 flex-1">
                            <Button.Content content="Cadastrar um Usuário" />
                            <Button.Icon icon={FaPlus} />
                        </Button.Root>

                     </div>

            </div>


        </TableHeaderWrapper>

    );

}