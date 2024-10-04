
import { Flex, Skeleton } from "antd";
import { StatsCard } from "../shared/Card/StatsCard";
import { useInvoicingCardItem } from "../../hooks/invoicing/useInvoicingCardItem";


export const HomeCardContainer = () => {

    const {items, isLoading} = useInvoicingCardItem({enableFilterDate:false});
    
    
    return (
        
    <Flex className="w-full" justify="space-between" gap={18} align="center" wrap>


            {items.map((item,index) => {
            return (

                isLoading ? <>

                    <Skeleton key={index}  />
                
                </> : (

                    <StatsCard.Root key={index}>
                        <StatsCard.Header icon={item.icon} title={item.title}/>
                        <StatsCard.Footer>
        
                            <StatsCard.FooterContent
                            headingContent={item.footerHeding} 
                            textContent={item.footerText} 
                            />
        
                            <StatsCard.Percentual 
                                status={item.status as RequestStatusChange} 
                                percentual={item.percentual}
                             />
        
                        </StatsCard.Footer>
                    </StatsCard.Root>
                )


                

          

            )
        })}
            
        
        

    </Flex>

    );
}