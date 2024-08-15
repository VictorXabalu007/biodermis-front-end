import { Col, Empty, Row } from "antd";
import { TableWrapper } from "../shared/Table/components/TableWrapper";
import { useBannerData } from "./hooks/useBannerData";
import { BannerCard } from "../shared/Card/BannersCard";
import { usePagination } from "../../hooks/usePagination/usePagination";
import { ContainerPagination } from "../shared/Pagination/ContainerPagination";
import BannersFilters from "./banner-filter";


const PAGE_SIZE = 10;

const BannersContainer = () => {
  
  const { data, setData, isEmpty } = useBannerData();
  const paginationItems = usePagination({ data, pageSize: PAGE_SIZE });


  const handlePageChange = (page: number) => {
    paginationItems.setCurrentPage(page); 
  };


  return (
    <TableWrapper style={{ minHeight: "100vh" }}>

      <BannersFilters setData={setData} />

      {!isEmpty ? (
        <>
          <Row gutter={[20, 20]}>
            {paginationItems.currentItems.map((d) => (
           
                d.imagens.map(image => (
                  <Col key={d.id} xs={24} sm={12} md={8} lg={8} span={8}>
                  <BannerCard.Root 
                    imagem={image.url}
                    titulo={d.titulo}
                    order={image.order}
                    //@ts-ignore
                    id={d.id}
                   />
                  </Col>
                ))
         
            ))}
          </Row>

        
          <ContainerPagination
           currentPage={paginationItems.currentPage}
           totalItems={paginationItems.totalPages}
           onPageChange={handlePageChange}
           style={{
                marginTop:'10px',
                marginLeft:'0 auto'

           }}
           
        />
        </>
      ) : (
        <Empty description="Nenhum banner cadastrado no momento" />
      )}
    </TableWrapper>
  );
};

export default BannersContainer;
