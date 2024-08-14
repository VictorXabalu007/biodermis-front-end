import { RegisterProducts } from "../../../components/Register/RegisterProducts"
import { useStateTheme } from "../../../context/ThemeProvider"


export const RegisterProductsTemplate = () => {


    const {setTitle} = useStateTheme();
    setTitle('Cadastrar produtos')

    return (

        <>
        
            <RegisterProducts.SubHeader 
    
            linkText="Voltar para produtos"
            heading="Adicionar um produto"
            />

            <RegisterProducts.Form />
        
        </>
                

    )
}