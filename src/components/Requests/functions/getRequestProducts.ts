import { getProducts } from "../../Products/service/getProducts";


export const getRequestProducts = async (productsId: number[]) => {


    const data:Product[] = await getProducts();

    if(data){

        const compatibleData = productsId.map(r => data.find((d)=> d.produto_id === r))

        return compatibleData;

    }

    return null;


}