

import { CardsFilter } from "./cards-filter";
import { TableWrapper } from "../shared/Table/table-wrapper";
import { Col, Empty, Modal, Row, Skeleton } from "antd";
import { CategoriesCard } from "../shared/Card/CategoriesCard";
import { useMutation } from "@tanstack/react-query";
import { useMessageAction } from "../../hooks/useMessageAction";
import { getHeaders } from "../../service/getHeaders";
import { api } from "../../service/connection";
import { FlexWrapper } from "./styles";
import { useNavigate } from "react-router-dom";
import { PRODUCTS } from "../../constants/paths";
import { CategoryFilterActions, useCategoryFilter } from "../../context/CategoryFilterContext/CategoryFilterContext";
import { SELECTED_MENU_KEY } from "../../constants/sessionStorageKeys";
import { ContainerPagination } from "../shared/Pagination/container-pagination";
import { usePagination } from "../../hooks/usePagination";
import { useCategoriesData } from "../../hooks/categories/useCategoriesData";


const PAGE_SIZE  = 9;

const CategoryCardContainer = () => {

    const {
        isLoading,
        data,
        setData,
        getCategoryOptions

    }  = useCategoriesData();

    const navigate = useNavigate();

    const {dispatch} = useCategoryFilter();

    const {
        contextHolder, 
        success, 
        error} = useMessageAction()

        
    const handleClose = () => {
        Modal.destroyAll()
    }


    const paginationItems = usePagination({data,pageSize: PAGE_SIZE})

    const deleteCategory = useMutation({
        mutationFn: async (id:number)=> {
    
            const headers = getHeaders(); 
    
            const req = await api.delete(`/categorias/${id}`, {
              headers
            });
    
          
          return req.data;
        },
        onSuccess: (res, id)=> {

          success(res.success || "Categoria deletada com sucesso");
          setData(prevData => prevData.filter(item => item.id !== id))
          handleClose();
          
        },
    
        onError: (err:any, id) => {

         
          const isIdInData = data.find(d =>d.id===id);

          if(isIdInData){
              error('Há produtos cadastrados com essa categoria!')
          } else {
              error(err.response.data.error);
          }
    
            
          
        }
    
      });

    const handleOk = (id:number) => {
        deleteCategory.mutate(id);
    }


    const handlePageChange = (page: number) => {
        paginationItems.setCurrentPage(page); 
    };



    const handleCategorySearch = (categoria_id:number) => {

        const categoryOptions = getCategoryOptions();

        const default_index = categoryOptions.findIndex(option => option.value === categoria_id);

        dispatch({
            type:CategoryFilterActions.setCategoriaId,
            payload: {categoria_id}
        })
        dispatch({
            type:CategoryFilterActions.setDefaultIndex,
            payload: {default_index}
        })
        
        sessionStorage.setItem(SELECTED_MENU_KEY, JSON.stringify('4'))
        navigate(PRODUCTS)
        
        
    }



    return (


        <TableWrapper 
            style={{
                minHeight: '100vh',
                width:'100%'
            }}
        >

        {contextHolder}

        {isLoading ?
            
            <Skeleton />

            : (

                <>

                {

                    paginationItems.currentItems.length === 0 ?

                    <>

                        <CardsFilter 
                            data={data ?? []}
                            setData={setData}
                        />

                        <Empty 
                            description="Nenhuma categoria foi encontrada"
                        />

                    </>


                    : (

                        <>


                        <CardsFilter 
                            data={data}
                            setData={setData}
                        />

                        <Row gutter={[8,8]} style={{padding: 0}}>

                            {paginationItems.currentItems.map(d => (

                                <Col  xs={24} sm={12} md={8} lg={8} span={8}>
                                
                                <FlexWrapper>

                                    <CategoriesCard.Root
                                        onClick={()=>handleCategorySearch(d.id)}
                                        key={d.id}
                                    >
                                        <CategoriesCard.Header 
                                            onDelete={()=>handleOk(d.id)}
                                            title={d.categoria}
                                        />

                                    </CategoriesCard.Root>


                                </FlexWrapper>

                                               
                                </Col>
                            ))}
                        

                        </Row>

                        </>
                    
                    )



                }
                
                
                
                </>


            )

        }

        <ContainerPagination
           currentPage={paginationItems.currentPage}
           totalItems={paginationItems.totalPages}
           onPageChange={handlePageChange}
           style={{
                marginTop:'10px',
                marginLeft:'0 auto'

           }}
           
        />



        </TableWrapper>

    );

}

export default CategoryCardContainer;