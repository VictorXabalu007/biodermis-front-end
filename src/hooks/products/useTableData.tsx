import { useEffect } from "react";
import { CATEGORIES } from "../../constants/sessionStorageKeys";
import { useMutation, useQuery } from "@tanstack/react-query";

import { getCategory } from "../../components/Categories/service/getCategory";
import { api } from "../../service/connection";
import { useMessageAction } from "../useMessageAction";
import { useProductsData } from "./useProductsData";
import { getHeaders } from "../../service/getHeaders";


export const useTableData = () => {


  const {products, isLoading, setProducts} = useProductsData();

  const {data:categories} = useQuery<Category[]>({
    queryKey: ['category'],
    queryFn: getCategory
  });


  const {
    contextHolder, 
    success, 
    error} = useMessageAction()

  useEffect(()=> {

    if(categories && Array.isArray(categories)){
        sessionStorage.setItem(CATEGORIES, JSON.stringify(categories));
    }
  

  },[categories, products])



  const deleteProduct = useMutation({
    mutationFn: async (data:Product)=> {


      const headers = getHeaders();


      const req = await api.delete(`/produtos/${data.id}`, {
          headers
      });

  
       return req.data

  
    },
    onSuccess: (res, context:Product)=> {

      const rowId = context.id;

      success(res.success);
      
      
      setProducts((prev) =>
        prev.filter((data) => data.id !== rowId)
      );

      
    },

    onError: (err:any) => {

      error(err.response.data.error)
      
    }

  }); 



  return { products,deleteProduct, setProducts, isLoading, contextHolder };
};
