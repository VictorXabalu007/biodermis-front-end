import { Button, Flex } from "antd"
import { WrapperPagination } from "../../Invoicing/components/DataContainer/components/styles"
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md"

type PaginationProps = {
    handleFirstPage: ()=>void
    handleNextPage: ()=>void
    handlePreviousPage: ()=>void
    handleLastPage: ()=>void
    totalPages: number,
    currentPage:number
}

export const ContainerPagination = (
    {handleFirstPage,
    handleNextPage,
    handlePreviousPage,
    handleLastPage,
    totalPages,
    currentPage

    }:PaginationProps) => {




    return (


        
        <Flex gap={5} align="center">

        <WrapperPagination>

            <Button className="pagination-btn" size="small" aria-label="first-page" onClick={handleFirstPage} disabled={currentPage === 1}>
                <MdKeyboardDoubleArrowLeft  />
            </Button>

        </WrapperPagination>

            <WrapperPagination>

                <Button className="pagination-btn" size="small" aria-label="prev-page" onClick={handlePreviousPage} disabled={currentPage === 1}>
                    <MdOutlineKeyboardArrowLeft />
                </Button>

            </WrapperPagination>

        

            <WrapperPagination>

                <Button className="pagination-btn" size="small" aria-label="next page" onClick={handleNextPage} disabled={currentPage === totalPages}>
                    <MdOutlineKeyboardArrowRight />
                </Button>

            </WrapperPagination>

            <WrapperPagination>

                <Button className="pagination-btn" size="small" aria-label="last page" onClick={handleLastPage} disabled={currentPage === totalPages}>
                    <MdKeyboardDoubleArrowRight />
                </Button>

            </WrapperPagination>

            <span>Página {currentPage} de {totalPages}</span>

        </Flex>
         

    )


}