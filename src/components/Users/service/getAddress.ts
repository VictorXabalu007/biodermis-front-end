import { api } from "../../../service/connection"
import { getHeaders } from "../../../service/getHeaders"



export const getAddress = async () => {

    const headers = getHeaders()
    try {

        const req = await api.get(`/endereco/0`,{
            headers
        })

        return req.data

    } catch (e:any) {

    }

}