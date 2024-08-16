import { useEffect } from "react";
import { TableWrapper } from "../shared/Table/table-wrapper";
import { UserCredentials } from "../../@types/UserData/UserData";
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
import { REGISTER_CONSULTOR } from "../../constants/paths/paths";
import { IoMdClose } from "react-icons/io";
import { ModalNavigator } from "../shared/Modal/modal-navigator";
import { useConsultorData } from "./hooks/useConsultorData";

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

    filteredData,
    setFilteredData,

    } = useTableActions({
    data:consultor,
    setData:setConsultor,
  });

  const navigate = useNavigate();

  const {confirm} = Modal;


  const showFormModal = ({readOnly,data}:{readOnly:boolean,data:UserCredentials}) => {

      confirm({

          content: <ModalNavigator 
      
              data={data} 
              isReadonly={readOnly} 
             
          />,
          
          okButtonProps: {className: 'hidden'}, 
          cancelButtonProps: {className: 'hidden'},
          maskClosable: true,
          closable: true,
          centered: true,
          closeIcon: <IoMdClose color={colors.primaryPurple} />,
          width: 500,
          icon:null
          
      });

  }


  const handleEditClick = (data:UserCredentials) => {


      showFormModal({readOnly: false,data});
     
     
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
        <Tooltip title="Editar">
          <Button 
          style={{ color: colors.primaryPurple }}
          type="text"
          onClick={()=>handleEditClick(record)}
          >
            <HiOutlinePencilAlt size={20} />
          </Button>
        </Tooltip>
      ),
    },
  ];

  return (
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

    
  );
};

export default ConsultorsTable;
