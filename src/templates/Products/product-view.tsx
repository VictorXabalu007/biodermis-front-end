import { Products } from "../../components/Products"
import { useStateTheme } from "../../context/ThemeProvider";




export const ProductsTemplate = () => {

    const {setTitle} = useStateTheme();
    setTitle('Produtos')

    return (

    
            <Products.Table />
            
  

    );

}