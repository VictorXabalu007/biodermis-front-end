import { FaPlus } from "react-icons/fa6";
import { TableHeaderWrapper } from "../shared/Table/table-header-wrapper";
import {  Button, Flex, Form, Input, Modal } from "antd";
import { CategoryType } from "./service/getCategory";
import { Dispatch, useEffect, useState } from "react";
import { FormModal } from "./register-category-modal";
import { useCategoryRegister } from "./hooks/useCategoryRegister";
import { SearchIcon } from "../shared/Icon/search";

type CardFilterProps = {
    data:CategoryType[] | undefined,
    setData:Dispatch<React.SetStateAction<CategoryType[]>>
}

export const CardsFilter = ({data,setData}:CardFilterProps) => {

    const [initialData, setInitialData] = useState<CategoryType[]>([]);
    const [categoryName, setCategoryName] = useState<string>('');
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false)

    const {
      contextHolder,
      control,
      errors,
      handleSubmit,
      onSubmit
    } = useCategoryRegister();
  
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
    
    return (

    <TableHeaderWrapper heading="Categorias gerais">

      {contextHolder}

        <div className="flex flex-wrap justify-between items-center">

            <div className="flex flex-wrap gap-2">
                
                <Input 
                  suffix={<SearchIcon />}
                  value={categoryName}
                  onChange={handleNameChange}
                  placeholder="Pesquisar categoria"
                  size="large"
                />


            </div>

            <div className="flex flex-wrap gap-2">

  
                <Button onClick={handleOpen} size="large">

                    <Flex gap={5} align="center">
                      Adicionar categoria

                      <FaPlus />
                    </Flex>

                </Button>

            </div>

        </div>

        <Modal
          open={open}
          onOk={handleSubmit(onSubmit)}
          onCancel={handleClose}
        >
          <Form
            layout="vertical"
          >

            <FormModal 
              errors={errors}
              control={control}
            />

          </Form>

        </Modal>

    </TableHeaderWrapper>


    );


}