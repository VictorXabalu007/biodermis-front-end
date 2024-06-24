import { useEffect, useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { NumericFormatter } from "../../shared/Formatter/NumericFormatter";

import { Button, Checkbox, Flex, Modal } from "antd";
import { FaTrash } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
import styled from "styled-components";
import { BRAND_PURPLE } from "../../../constants/classnames/classnames";
import { ButtonWrapper } from "../style/styles";
import { CATEGORIES } from "../../../constants/SessionStorageKeys/sessionStorageKeys";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ProductsType } from "../service/getProducts";
import { CategoryType, getCategory } from "../../Categories/service/getCategory";
import { api } from "../../../service/connection";
import { useMessageAction } from "../../../hooks/useMessageAction/useMessageAction";
import { isConsultor } from "../../../functions/Validators/ValidateConsultor/isConsultor";
import { useProductsData } from "./useProductsData";
import { getHeaders } from "../../../service/getHeaders";
import { Image } from "antd/lib";
import { useCategoriesData } from "../../Categories/hooks/useCategoriesData";


const columnHelper = createColumnHelper<ProductsType>();

export const useTableData = () => {

  const {products, isLoading, setProducts} = useProductsData();

  const {data:categories} = useQuery<CategoryType[]>({
    queryKey: ['category'],
    queryFn: getCategory
  });


  const {getCategoryNameById} = useCategoriesData();

  const {
    contextHolder, 
    success, 
    error} = useMessageAction()

  

  useEffect(()=> {

    if(categories && Array.isArray(categories)){
        sessionStorage.setItem(CATEGORIES, JSON.stringify(categories));
    }
  

  },[categories, products])

  
  const handleCancel = () => {
    Modal.destroyAll();
  };

  

  const { confirm } = Modal;

  const showConfirmModal = (
    handleOk: () => void,
    handleCancel: () => void,
    content: string
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


  const deleteProduct = useMutation({
    mutationFn: async (data:ProductsType)=> {

      let reqData = null;

      const headers = getHeaders();

      if(isConsultor()){

    
        const req = await api.delete(`/consultor/produtos/${data.produto_id}`, {
          headers
        });
          

        reqData = req.data

      } else {

        const req = await api.delete(`/produtos/${data.id}`, {
          headers
        });

  
        reqData = req.data

      }

      return reqData;

    },
    onSuccess: (res, context:ProductsType)=> {

      const rowId = context.id;

      success(res.success);

      
      setProducts((prev) =>
        prev.filter((data) => data.id !== rowId)
      );


      
    },

    onError: (err:any) => {

      error(err.response.data.error)
      
    }

  }); 



  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "selection",
        header: ({ table }) => (
          <Checkbox
            indeterminate={table.getIsSomeRowsSelected()}
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      }),
      columnHelper.accessor("imagePath", {
        id: "files",
        header: () => <p className="px-2">#</p>,
        cell: ({ getValue }) => {

          
          return (
            <Flex align="center" justify="center">
              <Image src={getValue()}  width={30} style={{ borderRadius: '5px', maxHeight: '30px', }} /> 
            </Flex>
          );
          
          
        },
      }),
      columnHelper.accessor("categoria_id", {
        id: "categoria_id",
        header: () => <p>SKU</p>,
        cell: ({ getValue }) => {
          return (
            <p>{getCategoryNameById(getValue())}</p>
          )
        }
      ,
        filterFn: 'equals'
      }),
      columnHelper.accessor("nome", {
        id: "productName",
        header: () => <p>Nome do produto</p>,
        cell: ({ getValue }) => <p>{getValue()}</p>,
        enableSorting: true,
      }),
      columnHelper.accessor(row => [row.valortotal, row.valorvenda], {
        id: "price",
        header: () => <p>Preço do produto</p>,
        cell: ({ getValue }) => {

          const [valortotal, valorvenda] = getValue();

          if(isConsultor()){
  
            return <NumericFormatter value={parseFloat(valortotal)} />;  
          } else {

            return <NumericFormatter value={parseFloat(valorvenda)} />;  
          }
        },
        enableSorting: true,
      }),
      columnHelper.accessor("mediaavs", {
        id: "mediaavs",
        header: () => <p>Media de vendas</p>,
        cell: ({ getValue }) => <p>{getValue()}</p>,
        enableSorting: true,
      }),
  
      columnHelper.display({
        id: "expand",
        header: () => <p>Ver mais</p>,
        cell: ({ row }) => {
          const Wrapper = styled.div`
            .expand-btn {
              &:hover {
                border-color: #b475a550 !important;
              }
            }
          `;

          return row.getCanExpand() ? (
            <Flex align="center" justify="center">
              <Wrapper>
                <Button
                  className="expand-btn border border-purple-solid-500"
                  aria-label="expand row"
                  size="small"
                  icon={
                    row.getIsExpanded() ? (
                      <IoIosArrowDown className="transition-all fill-purple-solid-500" />
                    ) : (
                      <IoIosArrowUp className="transition-all fill-purple-solid-500" />
                    )
                  }
                  onClick={row.getToggleExpandedHandler()}
                />
              </Wrapper>
            </Flex>
          ) : null;
        },
      }),
      columnHelper.display({
        id: "delete",
        header: ({ table }) => {

          const handleOk = async () => {
            const selectedRowsData = table.getSelectedRowModel().rows.map((row) => row.original);
          
            try {
      
              await Promise.all(selectedRowsData.map((data) => deleteProduct.mutateAsync(data)));
          
         
              setProducts((prev) =>
                prev.filter((data) => !selectedRowsData.some((d) => d.id === data.id))
              );
          
              Modal.destroyAll();
              success("Produtos deletados com sucesso!");

            } catch (error:any) {

              error("Erro ao excluir produtos");
              
            }
          };

          return (
            <Flex align="center" justify="center">
              <ButtonWrapper>
                <Button
                  disabled={
                    !table.getIsAllRowsSelected() &&
                    !table.getIsSomeRowsSelected()
                  }
                  onClick={() =>
                    showConfirmModal(
                      handleOk,
                      handleCancel,
                      "Tem certeza que deseja excluir este conjunto de produtos?"
                    )
                  }
                  aria-label="Delete row"
                  icon={<FaTrash />}
                  className="delete-btn bg-brand-purple"
                  size="middle"
                />
              </ButtonWrapper>
            </Flex>
          );
        },
        cell: ({ row }) => {
          const handleOk = () => {

            deleteProduct.mutate(row.original);
            Modal.destroyAll();

          };

          return (
            <ButtonWrapper>
              <Button
                aria-label="Delete row"
                icon={<FaTrash />}
                className="delete-btn bg-brand-purple"
                size="middle"
                onClick={() =>
                  showConfirmModal(
                    handleOk,
                    handleCancel,
                    "Tem certeza que deseja excluir este produto?"
                  )
                }
              />
            </ButtonWrapper>
          );
        },
      }),
    ],
    [products,getCategoryNameById]
  );

  return { products, columns, setProducts, isLoading, contextHolder };
};
