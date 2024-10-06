import { useTableData } from "../../hooks/withdraw/useTableData";
import { TableWrapper } from "../shared/Table/table-wrapper";
import {
  Avatar,
  Button,
  Flex,
  Form,
  Modal,
  Skeleton,
  Table,
  TableColumnProps,
  Tooltip,
} from "antd";

import { TableHeaderWrapper } from "../shared/Table/table-header-wrapper";
import { withdrawalSelectOptions } from "./util/selectOptions";
import { InputRangePicker } from "../shared/Input/range-picker";
import { useTableActions } from "../../hooks/useTableActions";

import { NumericFormatter } from "../shared/Formatter/numeric-formatter";
import { UploadComprovantModal } from "./upload-comprovant-modal";
import { useEffect, useState } from "react";
import { Text } from "../shared/Typography/typography-text";
import { IoIosArrowForward, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useComprovantRegister } from "../../hooks/withdraw/useComprovantRegister";
import FilterButton from "../shared/Button/filter-button";
import Select from "../shared/Input/select";
import { useConsultorData } from "../../hooks/users/useConsultorData";
import SearchInput from "../shared/Input/search-input";
import { urlParams } from "../../util/urlParams";
import { normalizeText } from "../../functions/normalize-text";
import { useNavigate } from "react-router-dom";

const WithdrawalTable = () => {

  const { withDrawData, setWithdrawData, isLoading } = useTableData();
  const [searchValue, setSearchValue] = useState("");
  const { withDrawData: initialData } = useTableData();
  const [currentWithdraw, setCurrentWithdraw] = useState<WithDrawal>(
    {} as WithDrawal
  );

  const navigate = useNavigate();
  const {
    getColumnSearchProps,
    filteredData,
    setFilteredData,
    clearAllFilters,
    isFiltered,
  } = useTableActions({
    data: withDrawData,
    setData: setWithdrawData,
  });

  const { getConsultorImageById } = useConsultorData();

  const handleStatusChange = (status:string) => {
    if (status === "") {
      setFilteredData(initialData);
    } else {
      setFilteredData(initialData.filter((d) => d.status === status));
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = (record: WithDrawal) => {
    setCurrentWithdraw(record);
    setOpen(true);
  };
  const handleClose = () => {
    setCurrentWithdraw({} as WithDrawal);
    setOpen(false);
  };

  const { control, errors, handleSubmit, onSubmit, contextHolder } =
    useComprovantRegister({
      id: currentWithdraw.id,
    });

  const columns: TableColumnProps<WithDrawal>[] = [
    {
      dataIndex: "consultor_id",
      title: "Perfil Consultor",
      key: "consultor_id",
      render: (_, record) => {
        return (
          <Flex justify="center" align="center">
            <Tooltip title={record.nome_consultor}>
              <Avatar
                style={{
                  maxWidth: "30px",
                }}
                src={getConsultorImageById(record.consultor_id) as string}
              />
            </Tooltip>
          </Flex>
        );
      },
      align: "center",
    },
    {
      dataIndex: "nome_consultor",
      title: "Nome Consultor",
      key: "nome_consultor",
      ...getColumnSearchProps("nome_consultor", "Nome Consultor"),
      align: "center",
    },
    {
      dataIndex: "datasaque",
      key: "datasaque",
      sorter: (a, b) =>
        new Date(a.datasaque).getTime() - new Date(b.datasaque).getTime(),
      ...getColumnSearchProps("datasaque", "Data do saque"),
      title: "Data saque",
    },
    {
      dataIndex: "saldo_disp",
      key: "saldo_disp",
      title: "Saldo disponível",
      sorter: (a, b) => parseFloat(a.saldo_disp) - parseFloat(b.saldo_disp),
      render: (value) => <NumericFormatter value={parseFloat(value)} />,
    },
    {
      dataIndex: "valorsaque",
      key: "valorsaque",
      title: "Valor do saque",
      sorter: (a, b) => parseFloat(a.valorsaque) - parseFloat(b.valorsaque),
      render: (value) => <NumericFormatter value={parseFloat(value)} />,
    },
    {
      dataIndex: "status",
      key: "status",
      title: "Status",
      render: (value, record) => {
        switch (value) {
          case "realizado":
            return (
              <div className="px-3 py-2 bg-green-solid-300/75 rounded-md max-w-[120px] flex items-center gap-2">
                <Text className="text-green-solid-900">Pago</Text>

                <IoMdCheckmarkCircleOutline className="text-green-solid-900 text-xl" />
              </div>
            );

          case "pendente":
            return (
              <Button onClick={() => handleOpen(record)}>
                <Flex gap={5} align="center">
                  Efetuar pagamento
                  <IoIosArrowForward />
                </Flex>
              </Button>
            );
        }
      },
    },
  ];

  console.log(withDrawData);
  
  const onFilter = (value:string) => {

    
    const filtered = withDrawData.filter((item) => {
     
      const name = normalizeText(item.nome_consultor);
      const price = normalizeText(item.valorsaque);
      const date = normalizeText(item.datasaque);


      return (
        name.includes(value) || 
        price.includes(value) || 
        date.includes(value) ||
        date.replace('/','').replace('/', '').includes(value)
      )


    });


    setFilteredData(filtered)

  }

  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>)=> {
    
    const value = normalizeText(e.target.value)

    setSearchValue(e.target.value)
    urlParams.set("search", value);
    navigate({
      pathname: window.location.pathname,
      search: `${urlParams.toString()}`
    });

    onFilter(value)

  }



  useEffect(() => {

    const search = urlParams.get("search");
    

    if (search) {
      setSearchValue(search)
      onFilter(search)
    } 
  }, [withDrawData]); 

  return (
    <>
      <TableWrapper>
        {contextHolder}

        <TableHeaderWrapper heading="Pedidos de saque">
          <Flex wrap justify="space-between" align="center">
            <Flex gap={15}>
            <SearchInput value={searchValue} placeholder="Pesquisar por preço ou nome" onChange={handleSearch} />
              <Select
                className="w-full md:w-auto"
                options={withdrawalSelectOptions}
                defaultValue={withdrawalSelectOptions[0]}
                onChange={handleStatusChange}
              />

              <FilterButton
                onFilterCancel={clearAllFilters}
                isFiltered={isFiltered}
              />
            </Flex>
            <InputRangePicker />
          </Flex>
        </TableHeaderWrapper>

        {isLoading ? (
          <Skeleton />
        ) : (
          <Table
            dataSource={filteredData}
            columns={columns}
            scroll={{ x: 300 }}
          />
        )}
      </TableWrapper>

      <Modal
        open={open}
        onCancel={handleClose}
        onOk={handleSubmit(onSubmit)}
        okButtonProps={{ style: { width: "49%" } }}
        cancelButtonProps={{ style: { width: "49%" } }}
      >
        <Form layout="vertical">
          <UploadComprovantModal
            withdraw={currentWithdraw}
            errors={errors}
            control={control}
          />
        </Form>
      </Modal>
    </>
  );
};

export default WithdrawalTable;
