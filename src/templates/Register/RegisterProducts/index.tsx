import { RegisterProducts } from "../../../components/Register/RegisterProducts"


export const RegisterProductsTemplate = () => {
    return (

        <RegisterProducts.Layout>
            
            <RegisterProducts.Header
            heading="Adicionar um produto"
            />

            <RegisterProducts.Content>
                
                <RegisterProducts.SubHeader 
         
                linkText="Voltar para produtos"
                heading="Adicionar um produto"
                />

                <RegisterProducts.Form />

            </RegisterProducts.Content>


        </RegisterProducts.Layout>

    )
}