import { useNavigate } from "react-router-dom";
import { TableHeaderWrapper } from "../../../shared/Table/components/TableHeaderWrapper";
import { Input } from "../../../shared/Input/Input";

import { SearchIcon } from "../../../shared/Icon/SearchIcon";
import { Button } from "../../../shared/Button";
import { REGISTER_CONSULTOR } from "../../../../constants/paths/paths";
import { FaPlus } from "react-icons/fa6";
import { TableFiltersProps } from "../../../../@types/Filters/TableFilterProps";
import { userStatusOptions } from "./util/selectOptions";

import { Flex } from "antd";
import Select from "../../../shared/Input/Select";


export const TableHeader = ({columnsFilters, setColumnFilters}:TableFiltersProps) => {

    const navigate = useNavigate();

    const username = columnsFilters.find((f) => f.id === "nome")?.value || "";
    
    const onFilterChange = (id:string,value:any) => setColumnFilters(prev => (
        prev.filter(f=> f.id !== id).concat({id,value})
    ));
      
    
    const handleStatusChange = (status: { value: string; label: string } | null) => {
        
        onFilterChange('status', status?.value);

    };


    return (

        <TableHeaderWrapper heading="Lista consultores">

            <Flex wrap justify="space-between" align="center">

                <Flex align="center" gap={10} className="md:flex-nowrap flex-wrap">
                    
                    <Input.Root className="lg:w-[400px] w-full">

                        <Input.System
                        className="flex-1"
                        placeholder="Buscar"
                        suffix= {<SearchIcon />}
                        value={username as string}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=> {
                          onFilterChange('nome',e.target.value)
                        }}

                        />
                    
                    </Input.Root>

                            <Input.Root className="w-full md:w-2/3">

                      
                                    <Select
                                        isSearchable
                                        options={userStatusOptions}
                                        // @ts-ignore
                                        onChange={handleStatusChange}
                                        defaultValue={userStatusOptions[0]}
                                    />

                            </Input.Root>


                </Flex>

                <Flex wrap gap={10} className="mt-3 xl:mt-0">
                    

                    <Button.Root 
                     onClick={()=>navigate(REGISTER_CONSULTOR)}
                     className="bg-white border border-purple-solid-500 text-purple-solid-500 hover:bg-purple-solid-200 flex-1">
                        <Button.Content content="Cadastrar um consultor" />
                        <Button.Icon icon={FaPlus} />
                    </Button.Root>


                </Flex>

            </Flex>

        </TableHeaderWrapper>

    )

}
