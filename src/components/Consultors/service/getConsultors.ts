import { get } from "../../../service/connection";


export const getConsultors = async () => {

        const req = await get('/consultores/0')

        return req;

}