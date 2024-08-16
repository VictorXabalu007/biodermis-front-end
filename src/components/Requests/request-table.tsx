import {
  Button,
  Flex,
  Form,
  Modal,
  Skeleton,
  Table,
  TableColumnType,
} from "antd";
import { useTableActions } from "../../hooks/useTableActions";
import { TableHeaderWrapper } from "../shared/Table/table-header-wrapper";
import { TableWrapper } from "../shared/Table/table-wrapper";
import { useRequestTable } from "./hooks/useRequestTable";
import { Requests } from "./@types/Requests";
import { InputRangePicker } from "../shared/Input/range-picker";
import Select from "../shared/Input/select";
import {
  daysOptions,
  deliveryOptions,
  sellChannelOptions,
  statusOptions,
} from "./util/selectOptions";
import {useState } from "react";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { IoFilter } from "react-icons/io5";
import EyeButton from "../shared/Button/edit-button";

import { buildPaymentStatus } from "./functions/buildPaymentStatus";
import { buildDeliveryStatus } from "./functions/buildDeliveryStatus";
import { NumericFormatter } from "../shared/Formatter/numeric-formatter";
import { buildTotalValue } from "./functions/buildTotalValue";
import DeleteButton from "../shared/Button/delete-button";
import DowloadButton from "../shared/Button/download-button";
import WhatzapButton from "../shared/Button/whatzap-button";
import { RequestViewModal } from "./request-view-modal";
import { RequestEditor } from "./update-delivery-request-modal";
import { useRequestTableFilters } from "./hooks/useRequestTableFilters";
import { useRequestUpdate } from "./hooks/useRequestUpdate";

const RequestsTable = () => {

  const { 
    data, 
    setData,
    isLoading,
    dowloadPdf
  } = useRequestTable();

  const { filteredData, setFilteredData, rowClassName, getColumnSearchProps } =
    useTableActions({
      data,
      setData,
    });

  const [currentRequest, setCurrentRequest] = useState({} as Requests)
  const [openView, setViewOpen] = useState(false)
  const [openEditor, setEditorOpen] = useState(false);

  const handleViewOpen = (record:Requests) => {
    setCurrentRequest(record)
    setViewOpen(true)
  }

  const handleViewClose = () => setViewOpen(false)

  const handleEditorOpen = (record:Requests) => {
    setCurrentRequest(record)
    setEditorOpen(true)
  }
  const handleEditorClose = () => setEditorOpen(false)

  const columns: TableColumnType<Requests>[] = [

    {
        dataIndex:'id',
        title: 'Pedidos',
        render: (value) => value < 10 ? '0' + value : value,
        sorter: (a, b) => a.id - b.id,
        align: 'center',
        ...getColumnSearchProps('id', 'Pedidos'),
    },
    {
        dataIndex:'nome_consultor',
        title: 'Consultor',
        ...getColumnSearchProps('nome_consultor', 'Consultor'),
        sorter: (a, b) => a.nome_consultor.localeCompare(b.nome_consultor),
    },
    {
        dataIndex:'nomeCliente',
        title: 'Cliente',
 
        sorter: (a, b) => {
          if(a.nomeCliente !== undefined && b.nomeCliente !== undefined) {
            return a.nomeCliente.localeCompare(b.nomeCliente)
          } else {
            return -1
          }
        },
        render: (value) => value || 'Cliente não informado',
        ...getColumnSearchProps('nomeCliente', 'Cliente'),
    },
    {
        dataIndex:'statuspag',
        key:'statuspag',
        title: 'Status Pagamento',
        render:(value)=>buildPaymentStatus(value),
    },
    {
        dataIndex:'statusentrega',
        key:'statusentrega',
        title: 'Status Entrega',
        render:(value,record)=> {
          return (
            buildDeliveryStatus({
              status:value,
              handleEditorOpen:()=>handleEditorOpen(record),
              request:record
            })
          )
        }
    },
    {
        dataIndex:'modelo',
        key:'modelo',
        title:'Modelo' 
    },
    {
        dataIndex:'valorfrete',
        key:'valorfrete',
        title:'Valor frete',
        render:(value)=> <NumericFormatter value={parseFloat(value)}/>,
        sorter: (a, b) => parseFloat(a.valorfrete) - parseFloat(b.valorfrete), 
    },
    {
        dataIndex:'formapag_id',
        key:'formapag_id',
        title:'Forma de Pagamento',
        render:(value,record)=>buildTotalValue(record.valor, value),
    },

    
    {
        key: "actions",
        title:'Ações',
        dataIndex: "actions",
        render: (_, record) => (
          <Flex align="center" gap={3}>
            <EyeButton
              onClick={()=>handleViewOpen(record)}
            />
  
            <DowloadButton
                onClick={()=>dowloadPdf(record)}
            />
  
            <WhatzapButton />
                      
            <DeleteButton
                  onDelete={()=>{}}
            />

          </Flex>
        ),
      },
   

  ];

  const {
    contextHolder,
    control,
    handleSubmit,
    errors,
    onSubmit
  } = useRequestUpdate({
    request:currentRequest,
  })

  const {
    handleDaysChange,
    handleOrderStatusChange,
    showFilters,
    handleOpenFilters,
    handlePaymentStatusChange,
    handleSellChannelChange
    
  } = useRequestTableFilters({
    data,
    setFilteredData
  })

  return (

    <>
    {contextHolder}
    <TableWrapper>
      <TableHeaderWrapper heading="Pedidos">
        <Flex wrap justify="space-between" align="center">
          <Flex
            align="center"
            gap={10}
            className="w-full md:flex-nowrap flex-wrap"
          >
            <Flex className="w-full" wrap gap={10}>
              <Flex className="w-full" justify="space-between" align="center">
                <Button size="large" onClick={handleOpenFilters}>
                  <Flex gap={5} align="center">
                    {showFilters ? "Ocultar filtros" : "Filtros avançados"}
                    {!showFilters ? (
                      <IoFilter />
                    ) : (
                      <MdOutlineCancelPresentation />
                    )}
                  </Flex>
                </Button>
                <InputRangePicker />
              </Flex>

              <div className="flex w-full items-center flex-wrap gap-4">
                {showFilters && (
                  <Flex gap={5}>
                    <Select
                      className="w-full md:w-auto"
                      options={daysOptions}
                      defaultValue={daysOptions[0]}
                     
                      onChange={handleDaysChange}
                    />

                    <Select
                      className="w-full md:w-[220px]"
                      options={statusOptions}
                      defaultValue={statusOptions[0]}
                      onChange={handlePaymentStatusChange}
                    />

                    <Select
                      className="w-full md:w-[200px]"
                      options={deliveryOptions}
                   
                      onChange={handleOrderStatusChange}
                      defaultValue={deliveryOptions[0]}
                    />

                    <Select
                      className="w-full md:w-auto"
                      options={sellChannelOptions}
                      defaultValue={sellChannelOptions[0]}
                      onChange={handleSellChannelChange}
                    />
                  </Flex>
                )}
              </div>
            </Flex>
          </Flex>
        </Flex>
      </TableHeaderWrapper>

      {isLoading ? (
        <Skeleton />
      ) : (
        <Table
          dataSource={filteredData}
          columns={columns}
          rowClassName={rowClassName}
          scroll={{ x: 300 }}
        />
      )}
    </TableWrapper>

    <Modal
      open={openView}
      onCancel={handleViewClose}
      closable
      maskClosable
      footer={null}
    >
      <RequestViewModal
        requests={currentRequest} 
       />
    </Modal>

    <Modal
      open={openEditor}
      closable
      maskClosable
      onCancel={handleEditorClose}
      width={600}
      onOk={handleSubmit(onSubmit)}
    >

      <Form
        layout="vertical"
      >

        <RequestEditor
            errors={errors}
            control={control}
            requestId={currentRequest.id} 
        />

      </Form>

    </Modal>

    </>
  );
};

export default RequestsTable;
