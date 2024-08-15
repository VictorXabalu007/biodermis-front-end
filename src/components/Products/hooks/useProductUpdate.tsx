import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { updateProduct } from "../service/updateProduct";
import { useMessageAction } from "../../../hooks/useMessageAction/useMessageAction";
import { ProductsType } from "../service/getProducts";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProductSchema } from "../../../validations/updateProductValidation";

type Props = {
    data:ProductsType
    id:number
    isEditing:boolean
}

export const useProductUpdate = ({data,id,isEditing}:Props) => {
    
    const [result,setResult] = useState({success:false,finish:false})
    const {contextHolder, success, error} = useMessageAction();
    const {control, handleSubmit,setValue,formState:{errors},reset} = useForm<ProductsType>({
        mode:'all',
        criteriaMode:'all',
        defaultValues: {
          ...data
        },
        resolver:zodResolver(updateProductSchema)
      });

      const updateProductMutation = useMutation({
        mutationFn: async (data:ProductsType)=> updateProduct(data,id),
        onSuccess: (res)=> {
          
          success(res.success);
        
          setResult({success:true,finish:true})

          window.location.reload()
          
          
        },
        onError:(err:any)=> {
          
          error(err.response.data.error);
          setResult({success:false,finish:true})
     
        }

      });

      const onSubmit = (data:ProductsType) => {
        
        if(!isEditing){ 
    
            updateProductMutation.mutate(data);
    
        }
        
    }


    return {
        result,
        control,
        handleSubmit,
        onSubmit,
        contextHolder,
        setValue,
        errors,
        updateProductMutation,
        reset
    }
    
}
