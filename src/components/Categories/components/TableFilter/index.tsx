import { FaPlus } from "react-icons/fa6";
import { Button } from "../../../shared/Button";
import { SearchIcon } from "../../../shared/Icon/SearchIcon";
import { Input } from "../../../shared/Input/Input";
import { TableHeaderWrapper } from "../../../shared/Table/components/TableHeaderWrapper";
import { TableFiltersProps } from "../../../../@types/Filters/TableFilterProps";
import {  Modal } from "antd";
import { IoMdClose } from "react-icons/io";
import { BRAND_PURPLE } from "../../../../constants/classnames/classnames";
import { FormModal } from "../Modal";



export const TableFilter = ({columnsFilters, setColumnFilters}:TableFiltersProps) => {


    const categoryName = columnsFilters.find((f) => f.id === "categories")?.value || "";
    
    const onFilterChange = (id:string,value:any) => setColumnFilters(prev => (
        prev.filter(f=> f.id !== id).concat({id,value})
    ));


    const {confirm} = Modal;

    const handleClose = () => {
        Modal.destroyAll();
    }

    
    const showRegisterModal = () => {


        confirm({
            content: <FormModal handleClose={handleClose} />,
            maskClosable: true,
            closeIcon: <IoMdClose style={{fill: BRAND_PURPLE}} />,
            closable: true,
            okButtonProps: {className: 'hidden'}, 
            cancelButtonProps: {className: 'hidden'},
        })


    }

    return (

    <TableHeaderWrapper heading="Categorias gerais">

        <div className="flex flex-wrap justify-between items-center">

            <div className="flex flex-wrap gap-2">
                
                <Input.Root className="lg:w-[400px] w-full flex-1">

                    <Input.System
                    className="py-2 flex-1"
                    placeholder="Buscar categoria"
                    suffix= {<SearchIcon />}
                    value={categoryName as string}
                    onChange={(e)=> {
                      onFilterChange('categories',e.target.value)
                    }}

                    />
                
                </Input.Root>

            </div>

            <div className="flex flex-wrap gap-2">

                <Button.Root
                    onClick={showRegisterModal}
                >
                    <Button.Content content="Adicionar uma categoria" />
                    <Button.Icon icon={FaPlus} />
                </Button.Root>

            </div>

        </div>

    </TableHeaderWrapper>

    );


}