import { Col, Empty, Row } from "antd";
import { TableWrapper } from "../shared/Table/components/TableWrapper";
import { useBannerData } from "./hooks/useBannerData";
import { BannerCard } from "../shared/Card/BannersCard";
import { usePagination } from "../../hooks/usePagination/usePagination";
import { ContainerPagination } from "../shared/Pagination/ContainerPagination";
import { BannersComponents } from "./components";

const PAGE_SIZE = 10;

export const BannersContainer = () => {
  const { data, setData, isEmpty } = useBannerData();
  const paginationItems = usePagination({ data, pageSize: PAGE_SIZE });


  return (
    <TableWrapper style={{ minHeight: "100vh" }}>

      <BannersComponents.Filters setData={setData} />

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

          <ContainerPagination {...paginationItems} />
        </>
      ) : (
        <Empty description="Nenhum banner cadastrado no momento" />
      )}
    </TableWrapper>
  );
};
