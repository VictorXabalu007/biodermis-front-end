
import { Col, Row } from "antd";
import { TableWrapper } from "../shared/Table/components/TableWrapper";
import { useBannerData } from "./hooks/useBannerData";
import { BannerCard } from "../shared/Card/BannersCard";
import { usePagination } from "../../hooks/usePagination/usePagination";
import { ContainerPagination } from "../shared/Pagination/ContainerPagination";
import { BannersComponents } from "./components";


const PAGE_SIZE = 10

export const BannersContainer = () => {

    const {data,setData} = useBannerData();
    const paginationItems = usePagination({data,pageSize: PAGE_SIZE})
  
    return (

        <TableWrapper style={{minHeight: '100vh'}}>  

            <BannersComponents.Filters setData={setData} />

            <Row gutter={[20,20]}>

                {paginationItems.currentItems.map(d => (
                    <Col xs={24} sm={12} md={8} lg={8} span={8}>
                        
                        <BannerCard.Root 
                        category={d.category}
                        bannerName={d.name}
                        bannerSrc={d.src}
                        bannerStatus={d.status}
                 
                        />   
                    
                    </Col>
                ))}

            </Row>

            
            <ContainerPagination
                {...paginationItems}
            />


        </TableWrapper>

    );
}