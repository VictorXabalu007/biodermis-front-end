import { FaPlus } from "react-icons/fa6";
import { Button } from "../../../shared/Button";
import { SearchIcon } from "../../../shared/Icon/SearchIcon";
import { Input } from "../../../shared/Input/Input";
import { TableHeaderWrapper } from "../../../shared/Table/components/TableHeaderWrapper";
import {  Modal } from "antd";
import { IoMdClose } from "react-icons/io";
import { BRAND_PURPLE } from "../../../../constants/classnames/classnames";
import { FormModal } from "../Modal";
import { CategoryType } from "../../service/getCategory";
import { Dispatch, useEffect, useState } from "react";

type CardFilterProps = {
    data:CategoryType[] | undefined,
    setData:Dispatch<React.SetStateAction<CategoryType[]>>
}

export const CardsFilter = ({data,setData}:CardFilterProps) => {


    const [initialData, setInitialData] = useState<CategoryType[]>([]);
    const [categoryName, setCategoryName] = useState<string>('');
  
    useEffect(() => {

      if (data && data?.length > 0 && initialData.length === 0) {
        setInitialData(data);
      }
    
    }, []);
  
    useEffect(() => {
      if (categoryName.trim() === '') {
        setData(initialData);
      } else {
        const filteredData = initialData.filter(p =>
          p.categoria.toLowerCase().includes(categoryName.toLowerCase())
        );
        setData(filteredData);
      }
    }, [categoryName, initialData, setData]);
  
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const categoria = e.target.value;
      setCategoryName(categoria);
    };

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
                    value={categoryName}
                    onChange={handleNameChange}

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