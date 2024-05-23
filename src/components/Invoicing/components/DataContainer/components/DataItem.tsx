import { TfiWallet } from "react-icons/tfi";
import { Heading } from "../../../../shared/Heading";
import { Text } from "../../../../shared/Text";
import { CardDataType } from "../util/@types/CardDataType";
import { MoneyCardType } from "../../../../shared/Card/MoneyDataCard/@types/MoneyCardType";
import { MoneyDataCard } from "../../../../shared/Card/MoneyDataCard";
import { useState } from "react";
import { Button, Flex } from "antd";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Wrapper } from "./styles";


type DataItemProps = {

    title: string,
    subtitle:string,
    cardData: CardDataType[];
    cardType: MoneyCardType

}

const PAGE_SIZE = 5;

export const DataItem = ({title, subtitle, cardData, cardType}:DataItemProps) => {

    const [currentPage, setCurrentPage] = useState(1);

   
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
  
   
    const currentItems = cardData.slice(startIndex, endIndex);
  
    
    const totalPages = Math.ceil(cardData.length / PAGE_SIZE);

    const handleFirstPage = () => {
        setCurrentPage(1);
      };
    
    const handleLastPage = () => {
        setCurrentPage(totalPages);
    };
  
  
    const handlePreviousPage = () => {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
  
    const handleNextPage = () => {
      setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };


    return(

    <div className="border gap-3 flex flex-col rounded-md p-3 flex-1 flex border-gray-neutral-100">
            
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
    
    {currentItems.map(data => {

        return (

        <MoneyDataCard.Root>

            <MoneyDataCard.LeftWrapper>
                
                <MoneyDataCard.Icon cardType={cardType} />

                <MoneyDataCard.Text 
                title={data.title}
                subtitle={data.subtitle}
                />


            </MoneyDataCard.LeftWrapper>

            <MoneyDataCard.Value 
            cardType={cardType} 
            value={data.value}
             />



        </MoneyDataCard.Root>

        )


    })}


        <Flex gap={5} align="center">

            <Wrapper>

            <Button className="pagination-btn" size="small" aria-label="first-page" onClick={handleFirstPage} disabled={currentPage === 1}>
                <MdKeyboardDoubleArrowLeft  />
            </Button>

            </Wrapper>

                <Wrapper>

                    <Button className="pagination-btn" size="small" aria-label="prev-page" onClick={handlePreviousPage} disabled={currentPage === 1}>
                        <MdOutlineKeyboardArrowLeft />
                    </Button>

                </Wrapper>

              

                <Wrapper>

                    <Button className="pagination-btn" size="small" aria-label="next page" onClick={handleNextPage} disabled={currentPage === totalPages}>
                        <MdOutlineKeyboardArrowRight />
                    </Button>

                </Wrapper>

                <Wrapper>

                    <Button className="pagination-btn" size="small" aria-label="last page" onClick={handleLastPage} disabled={currentPage === totalPages}>
                        <MdKeyboardDoubleArrowRight />
                    </Button>

                </Wrapper>

                <span>Página {currentPage} de {totalPages}</span>
                   

            </Flex>

        </div>


    );

}