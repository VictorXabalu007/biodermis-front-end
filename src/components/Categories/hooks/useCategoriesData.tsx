
import { CategoryType, getCategory } from "../service/getCategory"
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Modal } from "antd";
import { BRAND_PURPLE } from "../../../constants/classnames/classnames";
import { IoMdClose } from "react-icons/io";

type ModalConfirmProps = {
  handleOk: () => void,
  handleCancel: () => void,
  content: string
}


export const useCategoriesData = () => {


    const {data:categories, isLoading} = useQuery({
        queryKey: ['categorias'],
        queryFn: getCategory
    })


    const [data, setData] = useState<CategoryType[]>([]);

    useEffect(()=> {

        if(categories){
            setData(categories);
        }

    },[categories]);

    const { confirm } = Modal;

  const showConfirmModal = (
    {content,handleCancel,handleOk}:ModalConfirmProps
  ) => {
    confirm({
      title: "Confirmar exclusão",
      content: content,
      closable: true,
      closeIcon: <IoMdClose style={{ fill: BRAND_PURPLE }} />,
      okButtonProps: { className: "hidden" },
      cancelButtonProps: { className: "hidden" },
      width: "40%",
      maskClosable: true,
      footer: () => (
        <>
          <Button
            className="cancel-btn border border-brand-purple hover:border-brand-purple"
            onClick={handleCancel}
            key="cancel"
          >
            Cancelar
          </Button>

          <Button
            className="ok-btn bg-brand-purple text-white"
            onClick={handleOk}
            key="ok"
          >
            Confirmar
          </Button>
        </>
      ),
    });
  };


  const getCategoryNameById = (ids:number[]) => {
    
    const names = data.filter(d => ids.includes(d.id))
    
    return names.flatMap(d => d.categoria).join(', ');

  }



  const getCategoryOptions = () => {
    const options = data.map(d => ({
        value: d.id,
        label: `Filtrar por: ${d.categoria}`
    }));

    return [
        {
            value: '',
            label: 'Filtrar por: todos'
        },
        ...options
    ];

  };


    return {
        data,
        setData,
        isLoading,
        showConfirmModal,
        getCategoryNameById,
        getCategoryOptions
        
    }



}