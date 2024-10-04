import { useEffect, useState } from "react";
import { TableWrapper } from "../shared/Table/table-wrapper";
import {
  Button,
  Flex,
  Image,
  Modal,
  Skeleton,
  Table,
  TableColumnsType,
  Tooltip,
} from "antd";
import { useTableActions } from "../../hooks/useTableActions";
import { buildPodium } from "../shared/Table/functions/buildPodium";
import { userImageFallback } from "../../util/projectImage";
import { buildStatus } from "../../functions/buildStatus";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { colors } from "../../theme/colors";
import { TableHeaderWrapper } from "../shared/Table/table-header-wrapper";
import Select from "../shared/Input/select";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { userStatusOptions } from "./util/selectOptions";
import { REGISTER_CONSULTOR } from "../../constants/paths";
import { ModalNavigator } from "../shared/Modal/modal-navigator";

import FilterButton from "../shared/Button/filter-button";
import DowloadButton from "../shared/Button/download-button";
import { downloadCertified } from "../../functions/download-certified";
import { useConsultorData } from "../../hooks/users/useConsultorData";


const ConsultorsTable = () => {

  const { consultor, setConsultor, isLoading } = useConsultorData();
  const {consultor:initialData} = useConsultorData();


  useEffect(()=> {
    if(consultor){
        setFilteredData(consultor)
    }
  },[consultor,initialData])

  const { 
    getColumnSearchProps,
    clearAllFilters,
    filteredData,
    setFilteredData,
    isFiltered
    } = useTableActions({
    data:consultor,
    setData:setConsultor,
  });

  const navigate = useNavigate();

  const [open, setOpen] = useState(false)
  const [currentConsultor, setCurrentConsultor] = useState<UserCredentials>({} as UserCredentials)


  const showFormModal = ({data}:{data:UserCredentials}) => {

    setCurrentConsultor(data)
    setOpen(true)

  }

  const handleEditClick = (data:UserCredentials) => {

      showFormModal({data});
     
  }

  const handleStatusChange = (selectedOption: any) => {
    if (selectedOption.value === "") {
      setFilteredData(initialData); 
    } else {
      const filtered = consultor.filter(
        (item) => item.status === selectedOption.value
      );
      setFilteredData(filtered);
    }
  };

  const columns: TableColumnsType<UserCredentials> = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      sorter: (a, b) => a.nome.localeCompare(b.nome),
      render: (value) => buildPodium(value),
      align: "center",
    },
    {
      title: "Perfil",
      dataIndex: "srcperfil",
      key: "srcperfil",
      render: (value, record) => (
        <Tooltip title={record.nome}>
          <Image
            src={value}
            fallback={userImageFallback}
            style={{
              maxWidth: "30px",
            }}
            preview={false}
          />
        </Tooltip>
      ),
    },
    {
      title: "Nomes",
      dataIndex: "nome",
      key: "nome",
      ...getColumnSearchProps("nome", "Nome"),
      sorter: (a, b) => a.nome.localeCompare(b.nome),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email", "Email"),
    },
    {
      title: "Telefone",
      dataIndex: "telefone",
      key: "telefone",
      ...getColumnSearchProps("telefone", "Telefone"),
      sorter: (a, b) => a.nome.localeCompare(b.nome),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (value, record) => buildStatus(value, record),
    },
    {
      title: "Ações",
      dataIndex: "actions",
      key: "actions",
      render: (_,record) => (
        <Flex align="center">
            <Tooltip title="Editar">
              <Button 
              style={{ color: colors.primaryPurple }}
              type="text"
              onClick={()=>handleEditClick(record)}
              >
                <HiOutlinePencilAlt size={20} />
              </Button>
            </Tooltip>
            
            {record.cargo_id === 4 && <>
            
            <DowloadButton 
              title="Baixar certificado"
              onClick={()=>downloadCertified(record.srccert)}
              outlined={false}
            /> 
          
          </>}

        </Flex>
      ),
    },
  ];

  return (

    <>
      <TableWrapper>
        <TableHeaderWrapper heading="Lista de consultores">
          <Flex wrap justify="space-between" align="center">
            <Flex align="center" gap={10} className="md:flex-nowrap flex-wrap">
              <Select
                isSearchable
                options={userStatusOptions}
                onChange={handleStatusChange}
                defaultValue={userStatusOptions[0]}
              />
                <FilterButton 
                onFilterCancel={clearAllFilters}
                isFiltered={isFiltered}
              />
            </Flex>

            <Flex wrap gap={10} className="mt-3 xl:mt-0">
              <Button
                size="large"
                onClick={() => navigate(REGISTER_CONSULTOR)}
              >
                <Flex gap={5} align="center">
                  <FaPlus />
                  Cadastrar um consultor
                </Flex>
              </Button>
            </Flex>
          </Flex>
        </TableHeaderWrapper>

        {isLoading ? (
          <Skeleton />
        ) : (
      

            <Table 
              dataSource={filteredData} 
              columns={columns} 
              scroll={{x: 300}}
            />

    
        )}
      </TableWrapper>

      <Modal
        open={open}
        onCancel={()=>setOpen(false)}
        centered
        closable
        maskClosable
        footer={null}
      >
        <ModalNavigator 
          data={currentConsultor}
          isReadonly={false}
        />
      </Modal>
    
    
    </>

    
  );
};

export default ConsultorsTable;
