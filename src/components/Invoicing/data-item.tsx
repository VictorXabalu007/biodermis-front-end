import { TfiWallet } from "react-icons/tfi";
import { Heading } from "../shared/Heading";
import { Text } from "../shared/Text";
import { MoneyCardType } from "../shared/Card/MoneyDataCard/@types/MoneyCardType";
import { MoneyDataCard } from "../shared/Card/MoneyDataCard";
import { Card, Empty, Flex } from "antd";
import { MovimentationType, useMovimentationData } from "../../hooks/useMovimentationData/useMovimentationData";
import { ContainerPagination } from "../shared/Pagination/ContainerPagination";
import { usePagination } from "../../hooks/usePagination/usePagination";


type DataItemProps = {

    title: string,
    subtitle:string,
    cardData: MovimentationType[];
    cardType: MoneyCardType

}

const PAGE_SIZE = 5;


export const DataItem = ({title, subtitle, cardData, cardType}:DataItemProps) => {

    const paginationItems = usePagination({data:cardData, pageSize: PAGE_SIZE})

    const {
        getDateOfRequest,
        getNameOfRequest,
        getDateOfWithDrawal,
        getNameOfWithdraw
    } = useMovimentationData();

    const handlePageChange = (page: number) => {
        paginationItems.setCurrentPage(page); 
    };



    return(

        <Card
            style={{
                flex:1,
                minHeight:'600px'
            }}
        >

                
            <Flex align="center" gap={15} className = "mb-10">

                <Heading.Root className="font-semibold text-[20px] text-black">
                    
                    <div className="bg-brand-purple/25 rounded-md p-3">
                        <Heading.Icon className="text-brand-purple" icon={TfiWallet} />
                    </div>

                    <Heading.Content content={title} />

                </Heading.Root>

                <Text.Root className="font-light">
                    <Text.Content content={subtitle} />
                </Text.Root>

            </Flex>

            {paginationItems.currentItems.length === 0 ?

            <>
            
                <Empty 
                description = "Sem dados no momento"
                />
            
            
            </> : (


                    paginationItems.currentItems.map(data => {
            
                    
                    return (
                    
                    <MoneyDataCard.Root>
            
                        <MoneyDataCard.LeftWrapper>
                            
                            <MoneyDataCard.Icon cardType={cardType} />
            
                            <MoneyDataCard.Text 
                                title={cardType === 'input' ? getDateOfRequest(data.pedido_id) : getDateOfWithDrawal(data.saque_id)}
                                subtitle={cardType === 'input' ? getNameOfRequest(data.pedido_id) : getNameOfWithdraw(data.saque_id)}
                            />
            
            
                        </MoneyDataCard.LeftWrapper>
            
                        <MoneyDataCard.Value 
                        cardType={cardType} 
                        value={parseFloat(data.valor)}
                        />
            
            
            
                    </MoneyDataCard.Root>

                 
            
                    )
            
            
                })

            )}
        

        {paginationItems.currentItems.length > 0 &&
        
        <ContainerPagination
                    currentPage={paginationItems.currentPage}
                    totalItems={paginationItems.totalPages}
                    onPageChange={handlePageChange}
                    style={{
                            marginTop:'10px',
                            marginLeft:'0 auto'

                    }}

                    />
        
        }

        </Card>



    );

}