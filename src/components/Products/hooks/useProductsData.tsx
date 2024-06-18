import { useQuery } from "@tanstack/react-query";
import { ProductsType, getAllProducts, getProducts } from "../service/getProducts";
import { useCallback, useEffect, useState } from "react";
import { getHeaders } from "../../../service/getHeaders";
import { URL, api } from "../../../service/connection";


export const useProductsData = () => {


  const {data, isLoading} = useQuery<ProductsType[]>({
    queryKey: ['products'],
    queryFn: ()=> getProducts()
  });

  const {data:totalProducts} = useQuery<ProductsType[]>({
    queryKey: ['allProducts'],
    queryFn: ()=> getAllProducts()
  });

  const [allProducts, setAllProducts] = useState<ProductsType[]>([]);

  useEffect(()=> {
    if(totalProducts){
      setAllProducts(totalProducts)
    }
  },[totalProducts]);


  const [products, setProducts] = useState<ProductsType[]>([]);


  useEffect(() => {
    
    if (data) {

      const newProducts = data.map(p => {

          if(p.imagens) {

            const path = p.imagens[0].replace(/\\/g, '\\');
            
    
            return {
              ...p,
              imagePath:URL + "/" + path,
            }

          } else {
            return {
              ...p
            }
          }

      })
      

      setProducts(newProducts)

    }

    


  }, [data]);


  
  const getProductsById = useCallback((id: number | number[]): ProductsType[] => {

    if (Array.isArray(id)) {
      const newProducts = id.map(i => products.find(p => p.produto_id === i)).filter(p => p !== undefined) as ProductsType[];
      return newProducts;
      
    } else {
      const product = products.find(p => p.produto_id === id);
      return product ? [product] : []; 
    }
  }, [products]);

  

  const getImageByPath = async (path:string) => {

      const headers = getHeaders();

      try {

        const req = await api.get(`/${path}`,{
          headers
        });
        return req.data
      } catch(e:any){

      }
      
     

  }

  const getGreatherSoldProduct = () => {


    const product = products?.sort((a, b) => parseFloat(a.mediaavs) - parseFloat(b.mediaavs))[0] || {}
    return product;

  }

  const getProductIdByName = (name: string) => {



    const id = products.find(p => p.nome === name)?.id;
    return id;


  }

  const getProductsByCategoryId = (id:number) => {


    return products.filter(p => p.categoria_id === id) || []
  }

  

  return {
    products,
    setProducts,
    isLoading,
    getGreatherSoldProduct,
    getProductIdByName,
    getImageByPath,
    getProductsById,
    getProductsByCategoryId,
    allProducts
  }




}