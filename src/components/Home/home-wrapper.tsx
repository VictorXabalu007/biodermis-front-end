import { ReactNode, useEffect, useState } from "react";
import { BANK_OPS, CATEGORIES } from "../../constants/sessionStorageKeys";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Row } from "antd";
import { useCategoriesData } from "../../hooks/categories/useCategoriesData";



const HomeWrapper = ({children}:{children:ReactNode}) => {

    const {data:categories} = useCategoriesData();

    useEffect(()=> {
        if(categories) {
            sessionStorage.setItem(CATEGORIES, JSON.stringify(categories))
        }
    },[categories]);

    const [bankOptions, setBankOptions] = useState<Options[]>([]);

    
    const getBankOptions = async () => {


        const req = await axios.get('https://brasilapi.com.br/api/banks/v1');
     
        return req.data
  
      }
  

    const {data} = useQuery<BankOptions[]>({
        queryKey: ['bankOptions'],
        queryFn: getBankOptions
      })
  
      useEffect(()=> {
  
        if(data) {
  
          setBankOptions(data.map(d => ({
            value: d.name,
            label: `${d.code} - ${d.name}`,
            key: d.code
          })))
  
    
  
        }
  
      },[data,setBankOptions])

      useEffect(()=> {
        if(bankOptions){
              
            sessionStorage.setItem(BANK_OPS,JSON.stringify(bankOptions));
        }
      },[bankOptions]);

    return (

        <Row gutter={[20,16]}>
            {children}
        </Row>
        
    )
}

export default HomeWrapper