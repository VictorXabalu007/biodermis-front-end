import { useMutation } from "@tanstack/react-query"
import { removeImage, uploadImage } from "../service/imageService";
import { useMessageAction } from "../../../hooks/useMessageAction/useMessageAction";



type Props = {
    id: number
}

export const useImageUpload = ({id}:Props) => {

    const {contextHolder:imageContextHolder,success,error} = useMessageAction()
    const uploadImageMutation = useMutation({
        mutationFn: (image: any[]) => uploadImage(image,id),
        onSuccess: (res) => {
 
            success(res.success)
        },
        onError: (err:any) => {
            error(err.response.data.error)
        }
    })

    const deleteImageMutation = useMutation({
        mutationFn: (id:number)=>removeImage(id),
        onSuccess: (res) => {
 
            success(res.success)
        },
        onError: (err:any) => {
            error(err.response.data.error)
        }
    })

    return {
        uploadImageMutation,
        imageContextHolder,
        deleteImageMutation
    }

}