import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { updateProduct } from "../service/updateProduct";
import { useMessageAction } from "../../../hooks/useMessageAction/useMessageAction";
import { ProductsType } from "../service/getProducts";
import { Row, Table } from "@tanstack/react-table";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProductSchema } from "../../../validations/updateProductValidation";

type Props = {
    data:ProductsType
    id:number
    isEditing:boolean
    table?:Table<ProductsType>
    row?:Row<ProductsType>
}

export const useProductUpdate = ({data,id,isEditing,table,row}:Props) => {
    
    const [result,setResult] = useState({success:false,finish:false})
    const {contextHolder, success, error} = useMessageAction();
    const {control, handleSubmit,setValue,formState:{errors}} = useForm<ProductsType>({
        mode:'all',
        criteriaMode:'all',
        defaultValues: {
          ...data
        },
        resolver:zodResolver(updateProductSchema)
      });

      const updateProductMutation = useMutation({
        mutationFn: async (data:ProductsType)=> updateProduct(data,id),
        onSuccess: (res, context)=> {
          
          success(res.success);
    
          //@ts-ignore
          table.options.meta?.updateData(row.index, context);
          setResult({success:true,finish:true})
      
          
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
        updateProductMutation
    }
}
