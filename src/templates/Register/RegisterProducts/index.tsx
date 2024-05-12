import { RegisterProducts } from "../../../components/Register/RegisterProducts"
import { PRODUCTS } from "../../../constants/paths/paths"



export const RegisterProductsTemplate = () => {
    return (

        <RegisterProducts.Layout>
            
            <RegisterProducts.Header
            heading="Adicionar um produto"
            />

            <RegisterProducts.Content>
                
                <RegisterProducts.SubHeader 
                path={PRODUCTS}
                linkText="Voltar para produtos"
                heading="Adicionar um produto"
                />

                <RegisterProducts.Form />

            </RegisterProducts.Content>


        </RegisterProducts.Layout>

    )
}