import { useNavigate } from "react-router-dom";
import { TableHeaderWrapper } from "../../../shared/Table/components/TableHeaderWrapper";
import { Input } from "../../../shared/Input/Input";
import { SearchIcon } from "../../../shared/Icon/SearchIcon";
import { Button } from "../../../shared/Button";
import { REGISTER_PRODUCTS } from "../../../../constants/paths/paths";
import { FaPlus } from "react-icons/fa6";
import { TableFiltersProps } from "../../../../@types/Filters/TableFilterProps";
import { isConsultor } from "../../../../functions/Validators/ValidateConsultor/isConsultor";
import { Modal } from "antd";
import { IoMdClose } from "react-icons/io";
import { BRAND_PURPLE } from "../../../../constants/classnames/classnames";
import { FormModal } from "../Modal";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../../../service/queryClient";

const {confirm} = Modal;

export const TableFilter = ({columnsFilters,setColumnFilters}:TableFiltersProps) => {

    const navigate = useNavigate();

    const username = columnsFilters.find((f) => f.id === "productName")?.value || "";
    
    const onFilterChange = (id:string,value:any) => setColumnFilters(prev => (
        prev.filter(f=> f.id !== id).concat({id,value})
    ));

    const handleClose = () => {
        Modal.destroyAll();
    }

    const showConsultorModal = () => {
        confirm({
            content: 
            <QueryClientProvider client={queryClient}>

                <FormModal handleClose={handleClose} />

            </QueryClientProvider>
           
            ,
            maskClosable: true,
            closeIcon: <IoMdClose style={{fill: BRAND_PURPLE}} />,
            closable: true,
            okButtonProps: {className: 'hidden'}, 
            cancelButtonProps: {className: 'hidden'},
        })
    }

    const handleClick = () => {


        if(isConsultor()){

            showConsultorModal();

        } else {
            navigate(REGISTER_PRODUCTS)
        }


    }

    return (

        <TableHeaderWrapper heading="Produtos gerais">

            <div className="flex flex-wrap justify-between items-center">

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