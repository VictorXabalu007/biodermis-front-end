import { Button, Card, Flex, Image, Skeleton, Table, TableColumnType, Tooltip } from "antd";
import { useWithdrawData } from "../../WithdrawalRequests/hooks/useWithdrawData";
import Title from "../../shared/Typography/typography-title";
import { useNavigate } from "react-router-dom";
import { WITHDRAWAL } from "../../../constants/paths/paths";
import { WithDrawal } from "../../WithdrawalRequests/util/withdrawalData";
import { userImageFallback } from "../../../util/projectImage";
import { NumericFormatter } from "../../shared/Formatter/NumericFormatter";
import { useEffect, useState } from "react";




const HomeWithdrawTable = () => {

  const {
    data,
    isLoading,
    accessBalance,
    getConsultorName
  } = useWithdrawData();

  const navigate = useNavigate();

  
  const [withDrawData, setWithdrawData] = useState<WithDrawal[]>([]);

  useEffect(()=> {

      if(data) {


          setWithdrawData(data.map(d => ({
              ...d,
              nome_consultor: getConsultorName(d.consultor_id),
              saldo_disp: accessBalance.saldodisp
          })))

      }

      

  },[data])

  const handleNavigate = () => navigate(WITHDRAWAL);

  const columns:TableColumnType<WithDrawal>[] = [
    {
        title: 'Imagem',
        dataIndex: 'consultor_id',
        key:'image_consultor',
        render: (value,record) => (
            <Tooltip
            title={record.nome_consultor}
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
        )

    },
    {
        title:'Consultor',
        dataIndex:'nome_consultor',
        key:'nome_consultor',
        sorter: (a, b) => a.nome_consultor.localeCompare(b.nome_consultor),
    },
    {
       title:'Valor',
       dataIndex:'valorsaque',
       key:'valorsaque',
       sorter: (a, b) => parseFloat(a.valorsaque) - parseFloat(b.valorsaque),
        render: (value) => (
            <NumericFormatter value={parseFloat(value)} />
        )
    }
  ]

  return (

    
    <Card
        title={
            <Flex align="center" className="w-full" justify="space-between">
                <Title level={5}>
                    Pedidos de saque
                </Title>
                <Tooltip title="Ir para pedidos de saque">
                    <Button onClick={handleNavigate}>
                        Gerenciar
                    </Button>
                </Tooltip>
            </Flex>
        }
    >


        {isLoading ? <>
            
            <Skeleton />

        </> : <>
        
            
                <Table
                scroll={{ x: 300 }}
                columns={columns}
                dataSource={withDrawData}
        
            />
        
        </>}


    </Card>

  );
  

}

export default HomeWithdrawTable