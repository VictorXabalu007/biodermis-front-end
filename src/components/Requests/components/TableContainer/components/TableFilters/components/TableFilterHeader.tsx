
import { IoFilter } from "react-icons/io5";

import { CiSearch } from "react-icons/ci";
import { Button } from "../../../../../../shared/Button";
import { Input } from "../../../../../../shared/Input/Input";


export const TableFilterHeader = () => {
    return (
        <div className="flex gap-2 w-1/2">
        <Input.System 

        placeholder="Buscar pedidos"
        icon = {<CiSearch className="fill-gray-neutral-400 text-xl" />}
        />

        <Button.Root className="py-3 w-1/2">

                <Button.Wrapper className="flex-row-reverse">
                
                    <Button.Icon icon={IoFilter} />
                    <Button.Content content="Filtros avançados" />

                </Button.Wrapper>
       
        </Button.Root>
        
    </div>
    )
}