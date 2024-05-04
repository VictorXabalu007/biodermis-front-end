import { Products } from "../../components/Products"




export const ProductsTemplate = () => {

    return (

    <Products.Layout>

        <Products.Header heading="Produtos" />

        <Products.Content>

            <Products.Table />
            
        </Products.Content>


    </Products.Layout>

    );

}