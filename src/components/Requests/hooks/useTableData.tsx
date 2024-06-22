import { ColumnFilter, createColumnHelper } from "@tanstack/react-table";
import { NumericFormatter } from "../../shared/Formatter/NumericFormatter";

import { FaTrash, FaWhatsapp } from "react-icons/fa6";

import { TableActions } from "../components/RequestsTable/components/TableActions";

import { useEffect, useMemo, useState } from "react";
import { useMutation} from "@tanstack/react-query";
import { TableSorterTitle } from "../../shared/Table/components/TableSorterTitle";
import { Requests } from "../components/@types/Requests";
import { buildPaymentStatus } from "../components/functions/buildPaymentStatus";
import { buildDeliveryStatus } from "../components/functions/buildDeliveryStatus";
import { buildTotalValue } from "../components/functions/buildTotalValue";
import { Button, Checkbox, Flex, Modal } from "antd";
import { api } from "../../../service/connection";
import { IoMdClose } from "react-icons/io";
import { BRAND_PURPLE } from "../../../constants/classnames/classnames";
import { useMessageAction } from "../../../hooks/useMessageAction/useMessageAction";
import { ButtonWrapper } from "../../Products/style/styles";
import { useRequestsData } from "./useRequestsData";
import { getHeaders } from "../../../service/getHeaders";

export const useTableData = () => {

    const {getConsultorName, data,setData,isError, isLoading} = useRequestsData();

      
    const {
      contextHolder, 
      success, 
      error} = useMessageAction()

    const [requestsData, setRequestsData] = useState<Requests[]>([]);

    useEffect(()=> {

      if(data) {
        setRequestsData(data.map(d => ({
          ...d,
          nome_consultor:getConsultorName(d.consultor_id)
        })))
        
      }

    },[data])

    
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
            {contextHolder}
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

    
    
    const columnHelper = createColumnHelper<Requests>();
    const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
    const [sorting, setSorting] = useState<any[]>([]);


    const mutation = useMutation({
        mutationFn: async (id:number)=> {

          const headers = getHeaders();
          
            const req = await api.delete(`/pedidos/${id}`, {
              headers
            });
    
        
          return req.data
        },
          onSuccess: (res, _, context:Requests) => {

          const { id } = context;
          console.log(res);
          
          success(res.success || `Pedido ${id} deletado com sucesso`);
          Modal.destroyAll();

          setData((prev) =>
            prev.filter((data) => data.id !== id)
          );

        },
      onError: (err: any) => {
       
        error(err.response.data.error);
        Modal.destroyAll();

      },
      
      });

    const columns = useMemo(() => [

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
        columnHelper.display({
            id: 'actions',
            header: () => <p>Ações</p>,
            cell: ({row}) => (
                <TableActions
                    requests={row.original}
                />
            ) ,
        }),

        columnHelper.accessor('id',{
            header: ({header}) => {
                return (
                    <TableSorterTitle
                        header={header}
                        title={"Pedidos"}
                    />
                )
            },  
            cell: ({getValue}) => `#${getValue() < 10 ? '0'+getValue(): getValue()}Pedido`,
            enableSorting: true,
        }),
    
        columnHelper.accessor('nome_consultor',{
            header: () => <p>Consultora</p>,
            cell: ({getValue}) => {

              return (getValue())
            },
        }),
    
        columnHelper.accessor('statuspag',{
            header: () => <p>Status pagamento</p>,
            cell: ({getValue}) => buildPaymentStatus(getValue()),
        }),
    
        columnHelper.accessor('statusentrega',{
            header: () => <p>Status de entrega</p>,
            cell: ({getValue, row}) => buildDeliveryStatus(getValue(), row.original),
        }),
        columnHelper.accessor('modelo',{
            header: () => <p>Compras/Vendas</p>,
            cell: ({getValue}) => getValue(),
        }),
        columnHelper.accessor('valorfrete',{
            header: () => <p>Valor frete</p>,
            cell: ({getValue}) =>  (
                <NumericFormatter
                   value={parseFloat(getValue())}
               />
            )
    
        }),
        columnHelper.accessor(row => [row.valor, row.formapag_id],{
            id: 'totalFormaPag',
            header: () => <p>Valor total</p>,
            cell: ({ getValue }) => {
                const [valor, formapag_id] = getValue();
                return buildTotalValue(valor as string, formapag_id as number | null);
              }
        }),
        columnHelper.display({
            id: 'whatsapp',
            header: () => <p>WhatsApp</p>,
            cell: () => <FaWhatsapp className="text-2xl mx-auto text-purple-solid-600 hover:text-purple-solid-600/50" />
        }),
        columnHelper.display({
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
              const handleOk = async () => {
              
                
                mutation.mutate(row.original.id);

    
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
                        "Tem certeza que deseja excluir este pedido?"
                      )
                    }
                  />
                </ButtonWrapper>
              );
            },
          }),
        
    ],[getConsultorName]);

    return {
        columns,
        data: requestsData,
        contextHolder,
        columnFilters,
        sorting,
        setSorting,
        setColumnFilters,
        isError,
        isLoading
    };


}