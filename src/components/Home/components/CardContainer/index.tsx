
import { Flex } from "antd";
import { StatsCard } from "../../../shared/Card/StatsCard";
import { useInvoicingCardItem } from "../../../Invoicing/hooks/useInvoicingCardItem";
import { Spinner } from "../../../shared/Spinner";


export const CardContainer = () => {

    const {items, isLoading} = useInvoicingCardItem({enableFilterDate:false});
    

    return (
        
    <Flex className="w-full" justify="space-between" gap={8} align="center" wrap>

    
            {items.map((item,index) => {
            return (

                isLoading ? <>

                    <Spinner key={item.percentual} />
                
                </> : (

                    <StatsCard.Root key={index}>
                        <StatsCard.Header icon={item.icon} title={item.title}/>
                        <StatsCard.Footer>
        
                            <StatsCard.FooterContent
                            headingContent={item.footerHeding} 
                            textContent={item.footerText} 
                            />
        
                            <StatsCard.Percentual percentual={item.percentual} />
        
                        </StatsCard.Footer>
                    </StatsCard.Root>
                )


                

          

            )
        })}
            
        
        

    </Flex>

    );
}