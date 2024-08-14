import { Categories } from "../../components/Categories"
import { useStateTheme } from "../../context/ThemeProvider"




export const CategoriesTemplate = () => {

    const {setTitle} = useStateTheme();
    setTitle('Categorias')

    return(


         <Categories.Cards />

    )
}