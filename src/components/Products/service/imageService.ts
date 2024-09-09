import { api } from "../../../service/connection"
import { getHeaders } from "../../../service/getHeaders";



export const uploadImage = async (images:any[],id:number) => {

    
    const formData = new FormData();
                
    images.map((image:any) => {
        formData.append('files', image.originFileObj as File); 
    });

    console.log(images);
    

    
    try {
        

        
        const headers = {
            ...getHeaders(),
            'Content-Type': 'multipart/form-data' 
          };
    

            try {
    
                await api.post(`/produtos/fotos/${id}`, formData, {
                    headers
                });
    
            } catch (error) {
               
            }
    } catch (e:any) {
        return e.message || e.data?.message
    }
}

export const removeImage = async (product_id:number,images_id:number[]) => {

    const body = {
        imagens: [...images_id]
    }


    try {

        const headers = getHeaders();
    
        const req = await api.delete(`/produtos/fotos/${product_id}`, {
            headers,
            data: body
          });

        return req.data
        
    } catch (e:any) {
        console.log(e);
        
        return e.message || e.data?.message
    }
}