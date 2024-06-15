import { ColumnFilter, createColumnHelper } from "@tanstack/react-table"
import { CategoryType, getCategory } from "../service/getCategory"
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Checkbox, Flex, Modal } from "antd";
import { FaTrash } from "react-icons/fa6";
import { ButtonWrapper } from "../../Products/style/styles";
import { BRAND_PURPLE } from "../../../constants/classnames/classnames";
import { IoMdClose } from "react-icons/io";
import { useMessageAction } from "../../../hooks/useMessageAction/useMessageAction";
import { api } from "../../../service/connection";
import { getHeaders } from "../../../service/getHeaders";



const columnsHelper = createColumnHelper<CategoryType>();

export const useTableData = () => {


    const {data:categories, isLoading} = useQuery({
        queryKey: ['categorias'],
        queryFn: getCategory
    })

    const {
        contextHolder, 
        success, 
        error} = useMessageAction()

    const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);

    const [data, setData] = useState<CategoryType[]>([]);

    useEffect(()=> {

        if(categories){
            setData(categories);
        }

    },[categories]);


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

  const mutation = useMutation({
    mutationFn: async (id:number)=> {

        const headers = getHeaders(); 

        const req = await api.delete(`/categorias/${id}`, {
          headers
        });

      

      return req.data;
    },
    onSuccess: (res)=> {
    
      success(res.success || "Categoria deletada com sucesso");
      
    },

    onError: (err:any) => {

      error(err.response.data.error)
      
    }

  });

    const columns = useMemo(()=> [
        columnsHelper.display({
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
        columnsHelper.accessor('categoria', {
            id: 'categories',
            header: ()=> (
                <div>
                    Categorias
                </div>
            ),
            cell: ({getValue})=> (
                <div>{getValue()}</div>
            )
        }),
        columnsHelper.display({
            id: "delete",
            header: ({ table }) => {
              const handleOk = () => {
                const selectedRowsData = table
                  .getSelectedRowModel()
                  .rows.map((row) => row.original);
                setData((prev) =>
                  prev.filter(
                    (data) => !selectedRowsData.some((d) => d.id === data.id)
                    
                  )
                  
                );
    
                selectedRowsData.map(p => [
                  mutation.mutate(p.id)
                ])
                
                Modal.destroyAll();
              };
              const handleCancel = () => {
                Modal.destroyAll();
              };
    
              return (
                <Flex align="center" justify="center">
                  {contextHolder}
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
              const handleOk = async () => {
    
                mutation.mutate(row.original.id);
    
                setData((prev) =>
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
                        "Tem certeza que deseja excluir essa categoria?"
                      )
                    }
                  />
                </ButtonWrapper>
              );
            },
          }),

    ],[]);


    return {
        data,
        setData,
        columns,
        isLoading,
        columnFilters,
        setColumnFilters
    }



}