import { useNavigate } from "react-router-dom";
import { TableHeaderWrapper } from "../../../shared/Table/components/TableHeaderWrapper";
import { Input } from "../../../shared/Input/Input";
import { SearchIcon } from "../../../shared/Icon/SearchIcon";
import { Button } from "../../../shared/Button";
import { REGISTER_PRODUCTS } from "../../../../constants/paths/paths";
import { FaPlus } from "react-icons/fa6";
import { TableFiltersProps } from "../../../../@types/Filters/TableFilterProps";


export const TableFilter = ({columnsFilters,setColumnFilters}:TableFiltersProps) => {

    const navigate = useNavigate();

    const username = columnsFilters.find((f) => f.id === "productName")?.value || "";
    
    const onFilterChange = (id:string,value:any) => setColumnFilters(prev => (
        prev.filter(f=> f.id !== id).concat({id,value})
    ));

    return (

        <TableHeaderWrapper heading="Produtos gerais">

            <div className="flex flex-wrap justify-between items-center">

                <div className="flex flex-wrap gap-2">
                    
                    <Input.Root className="lg:w-[300px] flex-1">

                        <Input.System
                        className="py-2 flex-1"
                        placeholder="Buscar Produto"
                        icon= {<SearchIcon />}
                        value={username as string}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=> {
                          onFilterChange('productName',e.target.value)
                        }}

                        />
                    
                    </Input.Root>

                </div>

                <div className="flex flex-wrap gap-2">

                    <Button.Root
                        onClick={()=>navigate(REGISTER_PRODUCTS)}
                    >
                        <Button.Content content="Adicionar um produto" />
                        <Button.Icon icon={FaPlus} />
                    </Button.Root>

                </div>

            </div>

        </TableHeaderWrapper>

    )
}