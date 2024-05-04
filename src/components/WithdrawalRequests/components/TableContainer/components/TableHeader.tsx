
import { Input } from "../../../../../components/shared/Input/Input"
import { Select } from "../../../../../components/shared/Input/Select"
import { TableHeaderWrapper } from "../../../../../components/shared/Table/components/TableHeaderWrapper"
import { InputRangePicker } from "../../../../../components/shared/Input/RangePicker"
import { selectOptions } from "./util/selectOptions"
import { SearchIcon } from "../../../../shared/Icon/SearchIcon"



export const TableHeader = () => {

    return (

        <TableHeaderWrapper heading="Pedidos de saque">

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
                        defaultValue="Ordenar por: Maior valor"
                        />

                    </Select.Root>

                </div>

                <div className="flex flex-wrap gap-2">
                

                    <InputRangePicker />

                </div>

            </div>

        </TableHeaderWrapper>

    )
}