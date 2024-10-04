import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { updateProduct } from "../../components/Products/service/updateProduct";
import { useMessageAction } from "../useMessageAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProductSchema } from "../../validations/updateProductValidation";

type Props = {
    data:Product
    id:number
    isEditing:boolean
}

export const useProductUpdate = ({data,id,isEditing}:Props) => {
    
    const [err, setErr] = useState('')
    const {contextHolder, success, error} = useMessageAction();
    const {control, handleSubmit,setValue,formState:{errors},reset} = useForm<Product>({
        mode:'all',
        criteriaMode:'all',
        defaultValues: {
          ...data
        },
        resolver:zodResolver(updateProductSchema)
      });

      const updateProductMutation = useMutation({
        mutationFn: async (data:Product)=> updateProduct(data,id),
        onSuccess: (res)=> {
          
          success(res.success);
        
          setTimeout(()=>{
            window.location.reload()  
          },1000)
          
        },
        onError:(err:any)=> {
          
          error(err)
          setErr(err)

        }

      });

      const onSubmit = (data:Product) => {
        
        if(!isEditing){ 
    
            updateProductMutation.mutate(data);
    
        }
        
    }


    
    return {
        control,
        handleSubmit,
        onSubmit,
        contextHolder,
        setValue,
        errors,
        updateProductMutation,
        reset,
        err
    }
    
}
