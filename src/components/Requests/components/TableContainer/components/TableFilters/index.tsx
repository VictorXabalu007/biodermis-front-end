import { CiSearch } from "react-icons/ci"
import { Button } from "../../../../../shared/Button"
import { Select } from "../../../../../shared/Input/Select"

import { Input } from "../../../../../shared/Input/Input"
import { IoFilter } from "react-icons/io5"
import { selectOptions } from "./util/selectOptions"


export const TableFilters = () => {

    return (

        <div className="flex flex-col gap-2 py-2">

            <div className="flex flex-wrap gap-3 w-full">
                <Input.System 

                className="lg:w-[350px]"
                placeholder="Buscar pedidos"
                icon = {<CiSearch className="fill-gray-neutral-400 text-xl" />}
                />

                <Button.Root className="py-3 lg:w-[200px]">

                        <Button.Wrapper className="flex-row-reverse">
                        
                            <Button.Icon icon={IoFilter} />
                            <Button.Content content="Filtros avançados" />

                        </Button.Wrapper>
            
                </Button.Root>
            
            </div>

            <div className="flex items-center flex-wrap gap-4">

          
                {selectOptions.map(item => {

                return (

                    <Select.Root className="flex-1 md:flex-none" icon={item.icon}>
                        <Select.System
                        className="w-full"
                        defaultValue={item.defaultValue}
                        options={item.options}
                        />
                    </Select.Root>

                )

                })}

            </div>
       

        </div>

    )

}