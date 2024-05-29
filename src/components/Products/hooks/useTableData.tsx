import { useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { NumericFormatter } from "../../shared/Formatter/NumericFormatter";
import { Image } from "antd/lib";
import { Button, Checkbox, Flex, Modal } from "antd";
import { FaTrash } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
import styled from "styled-components";
import { BRAND_PURPLE } from "../../../constants/classnames/classnames";
import { ButtonWrapper } from "../style/styles";
import { ProductsData } from "../../Register/RegisterProducts/components/FormContainer";
import { PRODUCTS_DATA } from "../../../constants/SessionStorageKeys/sessionStorageKeys";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../service/connection";

const columnHelper = createColumnHelper<ProductsData>();

const productsData: ProductsData[] = JSON.parse(
  sessionStorage.getItem(PRODUCTS_DATA) ?? "{}"
);

const getProducts = async () => {

  const products = await api.get('/produtos/0', {
    withCredentials: true
  })

  return products.data;
}

export const useTableData = () => {

  const {data, isLoading, isError} = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  });

  console.log(data);
  

  const [products, setProducts] = useState<ProductsData[]>(() => {

    if (productsData && productsData.length > 0) {
      return productsData;
    } else {
      return [];
    }

  });

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
      columnHelper.accessor("productsImage", {
        id: "productsImage",
        header: () => <p className="px-2">#</p>,
        cell: ({ getValue }) => {
          const images = getValue();
          
          if (images && images.length > 0) {
            const firstImage = images[0]; 

            return (
              <Flex align="center" justify="center">
                <Image
                  src={`https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload/${firstImage.name}`} 
                  width={30}
                  style={{ borderRadius: '5px' }}
                />
              </Flex>
            );
          } else {
            return null; 
          }
        },
      }),
      columnHelper.accessor("category", {
        id: "SKU",
        header: () => <p>SKU</p>,
        cell: ({ getValue }) => <p>{getValue()}</p>,
      }),
      columnHelper.accessor("productName", {
        id: "productName",
        header: () => <p>Nome do produto</p>,
        cell: ({ getValue }) => <p>{getValue()}</p>,
        enableSorting: true,
      }),
      columnHelper.accessor("sellPrice", {
        id: "price",
        header: () => <p>Preço do produto</p>,
        cell: ({ getValue }) => (
          <NumericFormatter value={parseFloat(getValue())} />
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("category", {
        id: "category",
        header: () => <p>Categoria</p>,
        cell: ({ getValue }) => <p>{getValue()}</p>,
        enableSorting: false,
      }),
      columnHelper.display({
        id: "totalSold",
        header: () => <p>Totais vendidos</p>,
        cell: () => <p>1000</p>,
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
          const handleOk = () => {
            const selectedRowsData = table
              .getSelectedRowModel()
              .rows.map((row) => row.original);
            setProducts((prev) =>
              prev.filter(
                (data) => !selectedRowsData.some((d) => d.id === data.id)
              )
            );
            Modal.destroyAll();
          };
          const handleCancel = () => {
            Modal.destroyAll();
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
                      "Tem certeza que deseja excluir este conjunto de dados?"
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
            setProducts((prev) =>
              prev.filter((data) => data.id !== row.original.id)
            );
            Modal.destroyAll();
          };
          const handleCancel = () => {
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
    []
  );

  return { products, columns, setProducts };
};
