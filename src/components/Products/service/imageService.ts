import { api } from "../../../service/connection"
import { getHeaders } from "../../../service/getHeaders";



export const uploadImage = async (images:any[],id:number) => {

    
    const formData = new FormData();
                
    images.map((image:any) => {
        formData.append('files', image.originFileObj as File); 
    });

    
    try {
        

        
        const headers = getHeaders();
    

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

export const removeImage = async (id:number) => {

    try {

        const headers = getHeaders();
    
        const req = await api.delete(`/produtos/fotos/${id}`, {
            headers
        });
        return req.data
        
    } catch (e:any) {
        return e.message || e.data?.message
    }
}