import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getHeaders } from "../../service/getHeaders";
import { api } from "../../service/connection";
import { useMessageAction } from "../useMessageAction";


type Props = {
    id : number
}

const proofSchema = z.object({
    pixProof: z.array(z.custom().refine(file => file !== null, 'Por favor, insira um arquivo'),
    {required_error: 'Insira o comprovante!'}).refine(arr => arr.length !== 0,
         'Insira um arquivo válido!')
    .transform(files => files[0])
})

export type RegisterPixProofType = z.infer<typeof proofSchema>;

export const useComprovantRegister = ({id}:Props) => {



    const {handleSubmit, control, formState: {errors}} = useForm<RegisterPixProofType>({
        resolver: zodResolver(proofSchema),
        criteriaMode: 'all',
        mode: 'all'
    });

    
    const {contextHolder,success,error} = useMessageAction();

    
    const uploadComprovant = useMutation({
        mutationFn:async (data:RegisterPixProofType)=> {

            const headers = getHeaders();

            const formData = new FormData();
            
            formData.append('file',data.pixProof as File)

            const req = await api.post(`/saques/comprovante/${id}`,{...data},{
                headers
            })

            return req.data
        },
        onSuccess : (res)=> {
            
            success(res.success)
            
        },
        onError: (err:any) => {

            error(err.response.data.error)
            
        }
    })

    const onSubmit = (data:RegisterPixProofType) => {

        uploadComprovant.mutate(data);
           
    }

  


    return {
        handleSubmit,
        control,
        errors,
        contextHolder,
        onSubmit
    }
  
}
