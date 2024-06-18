
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
    
        onError: (err:any) => {
    
          error(err.response.data.error);
            
          
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
            content: `Tem certeza que deseja deletar a categoria "${categoria}" ?`
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
      
        navigate(PRODUCTS)
        
    }



    return (


        <TableWrapper>

        {contextHolder}

        {isLoading ?
            
            <Spinner />

            : (

                <>

                {

                    data.length === 0 ?

                    <>

                        <CardsFilter 
                            data={data}
                            setData={setData}
                        />

                        <Empty 
                            description="Sem dados no momento"
                        />

                    </>


                    : (

                        <>


                        <CardsFilter 
                            data={data}
                            setData={setData}
                        />

                        <Row gutter={[8,8]} style={{padding: 0}}>

                            {data.map(d => (
                                <Col span={8}>
                                
                                <FlexWrapper>

                                    <CategoriesCard.Root
                                
                                        onClick={() => handleCategorySearch(d.id)}
                                        key={d.id}
                                    >
                                        <CategoriesCard.Header 
                                        onDelete={()=>handleDelete(d.id, d.categoria)}
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

         



        </TableWrapper>


        
    );

}