import { useEffect, useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { NumericFormatter } from "../../shared/Formatter/NumericFormatter";
import { Button, Checkbox, Flex, Modal, Popconfirm, Tooltip } from "antd";
import { FaEye, FaTrash } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import styled from "styled-components";
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
import { useNavigate } from "react-router-dom";

const columnHelper = createColumnHelper<ProductsType>();

export const useTableData = () => {

  const navigate = useNavigate();

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



  const deleteProduct = useMutation({
    mutationFn: async (data:ProductsType)=> {


      const headers = getHeaders();


      const req = await api.delete(`/produtos/${data.id}`, {
          headers
      });

  
       return req.data

    

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
      columnHelper.accessor("categoria_ids", {
        id: "categoria_ids",
        header: () => <p>SKU</p>,
        cell: ({ getValue }) => {
          return (
            <p>{getCategoryNameById(getValue())}</p>
          )
        },
        filterFn: 'arrIncludes'
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

                <Tooltip title={row.getIsExpanded() ? 'Ver menos' : 'Ver mais'}>

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


                </Tooltip>
              </Wrapper>
            </Flex>
          ) : null;
        },
      }),
      columnHelper.display({
        id: "view",
        header: () => <p>Visualizar</p>,
        cell: ({ row }) => {

          return (
            <Tooltip title="Editar de perto">

            <Button
              className="expand-btn border border-purple-solid-500"
              aria-label="expand row"
              size="small"
              icon={<FaEye className="transition-all fill-purple-solid-500" />}
              onClick={()=>navigate(`edit/${row.original.id}`)}
            />


          </Tooltip>
          )
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
              
              <Popconfirm 
              title="Tem certeza que deseja excluir este conjunto de produtos?"
              onConfirm={handleOk}
              >

                <Tooltip
                  title="Selecione um produto e clique no botão para deletar"
                >

                    <Button
                      disabled={
                        !table.getIsAllRowsSelected() &&
                        !table.getIsSomeRowsSelected()
                      }
                      aria-label="Delete row"
                      icon={<FaTrash />}
                      className="delete-btn bg-brand-purple"
                      size="middle"
                    />


                </Tooltip>


              </Popconfirm>
              
            </Flex>
          );
        },
        cell: ({ row }) => {
          const handleOk = () => {

            deleteProduct.mutate(row.original);
            Modal.destroyAll();

          };

          return (

            <Popconfirm 
            onConfirm={handleOk}
            title="Deseja mesmo deletar esse produto?"
            >

                <Button
                  aria-label="Delete row"
                  icon={<FaTrash />}
                  className="delete-btn bg-brand-purple"
                  size="middle"
               
                />


            </Popconfirm>
          
          );
        },
      }),
    ],
    [products,getCategoryNameById]
  );

  return { products, columns, setProducts, isLoading, contextHolder };
};
