
import { useCategoriesData } from "../../hooks/useCategoriesData";
import { CardsFilter } from "../CardsFilter";
import { TableWrapper } from "../../../shared/Table/components/TableWrapper";
import { Spinner } from "../../../shared/Spinner";
import { Col, Empty, Flex, Modal, Row } from "antd";
import { CategoriesCard } from "../../../shared/Card/CategoriesCard";
import { useMutation } from "@tanstack/react-query";
import { useMessageAction } from "../../../../hooks/useMessageAction/useMessageAction";
import { getHeaders } from "../../../../service/getHeaders";
import { api } from "../../../../service/connection";
import { FaArrowRightLong } from "react-icons/fa6";
import { FlexWrapper, HoverShowText } from "./styles";
import { useNavigate } from "react-router-dom";
import { PRODUCTS } from "../../../../constants/paths/paths";
import { CategoryFilterActions, useCategoryFilter } from "../../../../context/CategoryFilterContext/CategoryFilterContext";
import { SELECTED_MENU_KEY } from "../../../../constants/SessionStorageKeys/sessionStorageKeys";
import { ContainerPagination } from "../../../shared/Pagination/ContainerPagination";
import { usePagination } from "../../../../hooks/usePagination/usePagination";


const PAGE_SIZE  = 9;

export const CardContainer = () => {

    const {
        isLoading,
        data,
        setData,
        showConfirmModal,
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

    const handleDelete = (id:number, categoria:string) => {



        showConfirmModal(
          {
            handleOk:()=> handleOk(id),
            handleCancel:()=>  handleClose(),
            content: `Tem certeza que deseja deletar a categoria "${categoria}" ?`,
          }
            
        )

    }



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


        <TableWrapper style={{minHeight: '100vh'}}>

        {contextHolder}

        {isLoading ?
            
            <Spinner />

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
                                
                                        onClick={() => {handleCategorySearch(d.id)}}
                                        key={d.id}
                                    >
                                        <CategoriesCard.Header 
                                            onDelete={(e)=>{
                                                e.stopPropagation()
                                                handleDelete(d.id, d.categoria)
                                            }}
                                            title={d.categoria}
                                        />

                                        <CategoriesCard.Body>
                                            <HoverShowText 
                                                className="hover-show-text"
                                                type="text"
                                                style={
                                                    {
                                                        padding: 0,
                                                        border: 0,
                                                        backgroundColor: 'transparent'
                                                    }
                                                } 
                                            >   

                                            <Flex align="center" gap={5}>
                                                Ver produtos com essa categoria
                                                <FaArrowRightLong />
                                            </Flex>

                                            </HoverShowText>
                                        </CategoriesCard.Body>
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
            {...paginationItems}
        />



        </TableWrapper>


        
    );

}