import { Products } from "../../components/Products"
import { useStateTheme } from "../../context/ThemeProvider"




const EditProduct = () => {

  const {setTitle} = useStateTheme();
  setTitle('Editar produto')
  return (

    
            <Products.Editor />
            
       

  )
}

export default EditProduct