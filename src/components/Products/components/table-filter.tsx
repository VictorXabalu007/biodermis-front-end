
import { useNavigate } from "react-router-dom";
import { useCategoryFilter } from "../../../context/CategoryFilterContext/CategoryFilterContext";
import { TableFiltersProps } from "../../../@types/Filters/TableFilterProps";
import { CategoryType } from "../../Categories/service/getCategory";
import { CATEGORIES } from "../../../constants/SessionStorageKeys/sessionStorageKeys";
import { useEffect } from "react";
import { REGISTER_PRODUCTS } from "../../../constants/paths/paths";
import { SelectLabel } from "../../shared/Input/Select/SelectLabel";
import { TableHeaderWrapper } from "../../shared/Table/components/TableHeaderWrapper";
import { Input } from "../../shared/Input/Input";
import { Button } from "../../shared/Button";
import Select from "../../shared/Input/Select";
import { SearchIcon } from "../../shared/Icon/SearchIcon";
import { FaPlus } from "react-icons/fa6";


export const TableFilter = ({columnsFilters,setColumnFilters}:TableFiltersProps) => {

    const navigate = useNavigate();
    const {state} = useCategoryFilter();

    const username = columnsFilters.find((f) => f.id === "productName")?.value || "";
    
    const onFilterChange = (id:string,value:any) => setColumnFilters(prev => (
        prev.filter(f=> f.id !== id).concat({id,value})
    ));

    const dataCategories:CategoryType[] = JSON.parse(sessionStorage.getItem(CATEGORIES)?? '[]') || [];


    const handleCategoriesChange = (selectedOption: { value: string | number; label: string } | null) => {
        const categoryId = selectedOption?.value;
        if (categoryId === '') {
          setColumnFilters(prev => prev.filter(f => f.id !== 'categoria_ids'));
        } else {
          setColumnFilters(prev => prev.filter(f => f.id !== 'categoria_ids')
          .concat({ id: 'categoria_ids', value: Number(categoryId) }));
        }

        
      };

      useEffect(() => {

        if (state.categoria_id !== null) {

          setColumnFilters(prev => prev.filter(f => f.id !== 'categoria_ids')
          .concat({ id: 'categoria_ids', value: state.categoria_id }));
          
        }

      }, [state.categoria_id]);





    const handleClick = () => {

        navigate(REGISTER_PRODUCTS)

    }

    const categories = [
        {
            value: '',
            label: <SelectLabel onBold="Filtrar por: " afterBold="Todos" />
        },
        ...dataCategories.map(d => ({
            value: d.id,
            label: <SelectLabel onBold="Filtrar por: " afterBold={d.categoria} />
        }))
    ]


    return (


        <TableHeaderWrapper heading="Produtos gerais">

            <div className="flex gap-2 flex-wrap justify-between items-center">

                <div className="flex flex-wrap gap-2">
                    
                    <Input.Root className="lg:w-[400px] w-full flex-1">

                        <Input.System
                        className="py-2 flex-1"
                        placeholder="Buscar Produto"
                        suffix= {<SearchIcon />}
                        value={username as string}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=> {
                          onFilterChange('productName',e.target.value)
                        }}

                        />
                    
                    </Input.Root>

                    
                   
                
                        
                            <Select

                                options={categories}
                                defaultValue={categories[state.default_index ?? 0]}
                                onChange={(e)=> {
                                    handleCategoriesChange(e)
                                }}
                                className="w-full md:w-[250px]"
                                
                                
                            />
                        
                        
                        
                        





                </div>

                    
           
                
                    <div className="flex flex-wrap gap-2">

                        <Button.Root
                            onClick={handleClick}
                        >
                            <Button.Content content="Adicionar um produto" />
                            <Button.Icon icon={FaPlus} />
                        </Button.Root>

                    </div>
                
                

            </div>

        </TableHeaderWrapper>
        

    )
}