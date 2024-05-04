
import { Input } from "../../../../shared/Input/Input";
import { Select } from "../../../../shared/Input/Select";
import { Button } from "../../../../shared/Button";
import { FaPlus } from "react-icons/fa6";
import { selectOptions } from "./util/selectOptions";
import { TableHeaderWrapper } from "../../../../shared/Table/components/TableHeaderWrapper";
import { SearchIcon } from "../../../../shared/Icon/SearchIcon";


export const TableHeader = () => {

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
                            />
                        
                        </Input.Root>

                        <Select.Root className="flex-1 md:flex-none">
                            
                            <Select.System 
                            className="lg:w-[250px]"
                            options={selectOptions}
                            defaultValue="Ordenar por: Usuários"
                            />

                        </Select.Root>

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