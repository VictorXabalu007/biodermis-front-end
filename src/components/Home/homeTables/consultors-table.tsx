import { Button, Card, Flex, Image, Table, TableColumnType, Tooltip } from "antd";
import { useConsultorData } from "../../Consultors/hooks/useConsultorData";
import Title from "../../shared/Typography/typography-title";
import { useNavigate } from "react-router-dom";
import { CONSULTORS } from "../../../constants/paths/paths";
import { UserCredentials } from "../../../@types/UserData/UserData";
import { buildPodium } from "../../shared/Table/functions/buildPodium";
import { Text } from "../../shared/Typography/typography-text";
import { IoIosArrowUp } from "react-icons/io";
import { userImageFallback } from "../../../util/projectImage";



const HomeConsultorsTable = () => {

  const {
    consultor,
    isLoading
  } = useConsultorData();

  const navigate = useNavigate();

  const handleNavigate = () => navigate(CONSULTORS);

  const columns:TableColumnType<UserCredentials>[] = [
    {
        title: 'Rank',
        dataIndex: 'rank',
        key: 'rank',
        sorter: (a, b) => parseInt(a.rank) - parseInt(b.rank),
        render: (value) => (
            value === '1' || value === '2' || value === '3' ?
            buildPodium(value) : (

            <div className="flex px-2 gap-2 items-center">

                <Text>{value}</Text>

                <IoIosArrowUp className="text-lg text-green-flat" />

            </div>
            )
        ),
        align: 'center'
    },
    {
        title:'Imagem',
        dataIndex:'srcperfil',
        key:'srcperfil',
        render: (value,record) => (
                
            <Tooltip
             title={record.nome}
             trigger={'hover'}
             >

                <Image 
                    style={{
                        maxWidth: '30px'
                    }}
                    fallback={userImageFallback}
                    src={value} 
                    preview={false}
                />

            </Tooltip>
           
        ),
        align: 'center',
    },
    {
        title:'Nomes',
        dataIndex:'nome',
        key:'nome',
        sorter: (a, b) => a.nome.localeCompare(b.nome),
        align: 'center'
    }

  ]

  return (

    <Card
        title={
            <Flex align="center" className="w-full" justify="space-between">
                <Title level={5}>
                    Rank de consultores
                </Title>
                <Tooltip title="Ir para consultores">
                    <Button onClick={handleNavigate}>
                        Gerenciar
                    </Button>
                </Tooltip>
            </Flex>
        }
    >


        {isLoading ? <>
        
        </> : <>
        
            <Table
        
                columns={columns}
                dataSource={consultor}
         
            />
        
        </>}


    </Card>

  );

}

export default HomeConsultorsTable