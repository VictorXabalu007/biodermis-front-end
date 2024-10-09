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
import { useRequestTable } from "../../hooks/orders/useRequestTable";
import { InputRangePicker } from "../shared/Input/range-picker";
import Select from "../shared/Input/select";
import {
  daysOptions,
  deliveryOptions,
  sellChannelOptions,
  statusOptions,
} from "./util/selectOptions";
import React, { useState } from "react";
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

import { useRequestUpdate } from "../../hooks/orders/useRequestUpdate";
import { useRequestTableFilters } from "../../hooks/orders/useRequestTableFilters";
import SearchInput from "../shared/Input/search-input";
import { normalizeText } from "../../functions/normalize-text";


const RequestsTable = () => {

  const { 
    data, 
    setData,
    isLoading,
    dowloadPdf
  } = useRequestTable();

  const { filteredData, setFilteredData, rowClassName,clearAllFilters } =
    useTableActions({
      data,
      setData,
    });

  console.log(data);
  


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
    },
    {
        dataIndex:'nome_consultor',
        title: 'Consultor',
        sorter: (a, b) => a.nome_consultor.localeCompare(b.nome_consultor),
    },
    {
        dataIndex:'nomecliente',
        title: 'Cliente',
 
        sorter: (a, b) => {
          if(a.nomecliente !== undefined && b.nomecliente !== undefined) {
            return a.nomecliente.localeCompare(b.nomecliente)
          } else {
            return -1
          }
        },
        render: (value) => value || 'Cliente não informado',
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
        align:'center'
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
    handleSellChannelChange,
    setShowFilters
  } = useRequestTableFilters({
    data,
    setFilteredData,
    filteredData
  })

  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>)=> {
    const value = e.target.value;

    const filtered = data.filter((item) => {
     
      const id = normalizeText(String(item.id));
      const consultor = normalizeText(item.nome_consultor);
      const cliente = normalizeText(item.nomecliente);

      return (
        id.includes(value) ||
        consultor.includes(value) ||
        cliente.includes(value)
      )


    });


    setFilteredData(filtered)
  }


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
            wrap
          >
            <Flex align="start" justify="space-between" className="w-full" gap={10}>

              <Flex gap={15} vertical >

              <Flex gap={15}>

              <SearchInput onChange={handleSearch} placeholder="Pesquisar por pedido, consultor, cliente etc" />

                {!showFilters &&

                  <Button size="large" onClick={handleOpenFilters}>
                    <Flex gap={5} align="center">

                      Filtros avançados
                
                        <IoFilter />
                  
                    </Flex>
                  </Button>
      
                }

                {showFilters &&
                  <Button size="large" onClick={()=> {
                    clearAllFilters()
                    setShowFilters(false)
                  }}>
                    <Flex gap={5} align="center">
                      Ocultar filtros
                
                <MdOutlineCancelPresentation/>
                  
                    </Flex>
                  </Button>
      
                }



              </Flex>

              <div className="flex items-center flex-wrap gap-4">

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

              <InputRangePicker />
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
      width={570}
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
