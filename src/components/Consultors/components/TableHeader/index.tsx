import { useNavigate } from "react-router-dom";
import { TableHeaderWrapper } from "../../../shared/Table/components/TableHeaderWrapper";
import { Input } from "../../../shared/Input/Input";

import { SearchIcon } from "../../../shared/Icon/SearchIcon";
import { Button } from "../../../shared/Button";
import { REGISTER_CONSULTOR } from "../../../../constants/paths/paths";
import { FaPlus } from "react-icons/fa6";
import { TableFiltersProps } from "../../../../@types/Filters/TableFilterProps";
import { userStatusOptions } from "./util/selectOptions";
import styled from "styled-components";
import Select from "../../../shared/Input/Select";


export const TableHeader = ({columnsFilters, setColumnFilters}:TableFiltersProps) => {

    const navigate = useNavigate();

    const username = columnsFilters.find((f) => f.id === "name")?.value || "";

    const onFilterChange = (id:string,value:any) => setColumnFilters(prev => (
        prev.filter(f=> f.id !== id).concat({id,value})
    ));
      
    
    const handleStatusChange = (status: { value: string; label: string } | null) => {
        
        onFilterChange('status', status?.value);

    };

    const Wrapper = styled.div`
  .react-select-container .react-select__control {
    &:hover {
      border-color: #C882B7 !important;
    }
    &:focus {
      border-color: #C882B7 !important;
      box-shadow: none !important;
    }
    &.react-select__control--is-focused {
      border-color: #C882B7 !important;
    }
  }
`;


    return (

        <TableHeaderWrapper heading="Lista consultores">

            <div className="flex flex-wrap justify-between items-center">

                <div className="flex flex-wrap gap-2">
                    
                    <Input.Root className="lg:w-[400px] w-full">

                        <Input.System
                        className="py-2 flex-1"
                        placeholder="Buscar"
                        suffix= {<SearchIcon />}
                        value={username as string}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=> {
                          onFilterChange('name',e.target.value)
                        }}

                        />
                    
                    </Input.Root>
                    

                        <Wrapper>

                            <Select 

                            
                                classNamePrefix="react-select"
                                className="flex-1 md:flex-none react-select-container"
                                options={userStatusOptions}
                                onChange={handleStatusChange}
                                defaultValue={userStatusOptions[0]}
                                
                            />
                   

                        </Wrapper>

                </div>

                <div className="flex mt-3 xl:mt-0 flex-wrap gap-2">
                    

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
