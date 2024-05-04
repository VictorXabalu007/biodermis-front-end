import { FaPlus } from "react-icons/fa6"
import { Button } from "../../../../shared/Button"
import { Input } from "../../../../shared/Input/Input"
import { Select } from "../../../../shared/Input/Select"
import { TableHeaderWrapper } from "../../../../shared/Table/components/TableHeaderWrapper"
import { SearchIcon } from "../../../../shared/Icon/SearchIcon"



export const TableHeader = () => {

    return (

        <TableHeaderWrapper heading="Produtos gerais">

            <div className="flex flex-wrap justify-between items-center">

                <div className="flex flex-wrap gap-2">
                    
                    <Input.Root className="lg:w-[300px] flex-1">

                        <Input.System
                        className="py-2 flex-1"
                        placeholder="Buscar pedido"
                        icon= {<SearchIcon />}
                        />
                    
                    </Input.Root>

                    <Select.Root className="flex-1 md:flex-none">
                        <Select.System 
                        className="lg:w-[250px]"
                        options={[]}
                        defaultValue={'Ordenador por: Mais vendido'}
                        />
                    </Select.Root>
                </div>

                <div className="flex flex-wrap gap-2">

                    <Button.Root>
                        <Button.Content content="Adicionar um produto" />
                        <Button.Icon icon={FaPlus} />
                    </Button.Root>

                </div>

            </div>

        </TableHeaderWrapper>

    )
}