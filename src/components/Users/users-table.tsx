
import { TableWrapper } from "../shared/Table/table-wrapper.tsx"
import { useUsersData } from "./hooks/useUsersData.tsx"
import { Button, Flex, Image, Modal, Skeleton, Table, TableColumnsType, Tooltip } from "antd"
import { TableHeaderWrapper } from "../shared/Table/table-header-wrapper.tsx"
import { REGISTER_CONSULTOR } from "../../constants/paths/paths.ts"
import { FaPlus } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
import Select from "../shared/Input/select.tsx"
import { userSelectOptions } from "./util/selectOptions.tsx"
import { buildStatus } from "../../functions/buildStatus.tsx"
import { userImageFallback } from "../../util/projectImage.ts"
import { UserCredentials } from "../../@types/UserData/UserData.ts"
import { IoMdClose } from "react-icons/io"
import { colors } from "../../theme/colors.ts"
import { ModalNavigator } from "../shared/Modal/modal-navigator.tsx"
import { useTableActions } from "../../hooks/useTableActions.tsx"
import { useEffect } from "react"
import { HiOutlinePencilAlt } from "react-icons/hi"
import { getUserRole } from "../../util/userRole.ts"

const UsersTable = () => {

    const {
         users,
         setUsers,
         isLoading
    } = useUsersData();

    const {
        users:initialData
    } = useUsersData();


  useEffect(()=> {
    if(users){
        setFilteredData(users)
    }
  },[users])

  const { 
    getColumnSearchProps,
    filteredData,
    setFilteredData,
    } = useTableActions({
    data:users,
    setData:setUsers,
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


  const handleUserRoleChange = (userRole: {value:number | string,label:string}) => {

    if(userRole?.value === '') {
        setFilteredData(initialData)
    } else {
        setFilteredData(prev => prev.filter(p => 
            p.cargo_id === userRole.value
        ));
    }
     
  };

  const columns: TableColumnsType<UserCredentials> = [

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
        title: "Tipo",
        dataIndex: "cargo_id",
        key: "cargo_id",
        render: (value) => getUserRole(value),
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
        <Flex gap={10} align="center">
          
          <Tooltip title="Editar">
            <Button 
            style={{ color: colors.primaryPurple }}
            type="text"
            onClick={()=>handleEditClick(record)}
            >
              <HiOutlinePencilAlt size={20} />
            </Button>
      
          </Tooltip>
  
          

        </Flex>
      ),
   
 
    },
  ];

    

    return (

        <TableWrapper>

          
        <TableHeaderWrapper heading="Lista de usuários">
          <Flex wrap justify="space-between" align="center">
            <Flex align="center" gap={10} className="md:flex-nowrap flex-wrap">
              <Select
                isSearchable
                options={userSelectOptions}
                onChange={handleUserRoleChange}
                defaultValue={userSelectOptions[0]}
              />

            </Flex>
  
            <Flex wrap gap={10} className="mt-3 xl:mt-0">
              <Button
                size="large"
                onClick={() => navigate(REGISTER_CONSULTOR)}
              >
                <Flex gap={5} align="center">
                  <FaPlus />
                  Cadastrar um usuário
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

    )

}

export default UsersTable