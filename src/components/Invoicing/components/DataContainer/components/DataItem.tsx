import { TfiWallet } from "react-icons/tfi";
import { Heading } from "../../../../shared/Heading";
import { Text } from "../../../../shared/Text";
import { MoneyCardType } from "../../../../shared/Card/MoneyDataCard/@types/MoneyCardType";
import { MoneyDataCard } from "../../../../shared/Card/MoneyDataCard";
import { Empty, theme } from "antd";
import { MovimentationType, useMovimentationData } from "../../../../../hooks/useMovimentationData/useMovimentationData";
import { ContainerPagination } from "../../../../shared/Pagination/ContainerPagination";
import { usePagination } from "../../../../../hooks/usePagination/usePagination";


type DataItemProps = {

    title: string,
    subtitle:string,
    cardData: MovimentationType[];
    cardType: MoneyCardType

}

const PAGE_SIZE = 5;


export const DataItem = ({title, subtitle, cardData, cardType}:DataItemProps) => {

    const paginationMethods = usePagination({data:cardData, pageSize: PAGE_SIZE})

    const {
        getDateOfRequest,
        getNameOfRequest,
        getDateOfWithDrawal,
        getNameOfWithdraw
    } =useMovimentationData();

    const {

        token: {
            colorBgContainer
        }

    } = theme.useToken();

    return(

    <div style={{minHeight: '570px', background: colorBgContainer}} className="border
    gap-3 flex flex-col rounded-md p-3 flex-1 flex border-gray-neutral-100">
            
        <div className = "mb-10 flex items-center gap-2">

            <Heading.Root className="font-semibold text-[20px] text-black">
                
                <div className="bg-brand-purple/25 rounded-md p-3">
                    <Heading.Icon className="text-brand-purple" icon={TfiWallet} />
                </div>

                <Heading.Content content={title} />

            </Heading.Root>

            <Text.Root className="font-light">
                <Text.Content content={subtitle} />
            </Text.Root>

        </div>

        {paginationMethods.currentItems.length === 0 ?
        <>
        
            <Empty 
            description = "Sem dados no momento"
            />
        
        
        </> : (


                paginationMethods.currentItems.map(data => {
        
                
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
    

        <ContainerPagination
            {...paginationMethods}
        />

        </div>


    );

}