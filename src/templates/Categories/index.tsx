
import CategoryCardContainer from "../../components/Categories/category-cards";
import { useStateTheme } from "../../context/ThemeProvider"




export const CategoriesTemplate = () => {

    const {setTitle} = useStateTheme();
    setTitle('Categorias')

    return(

         <CategoryCardContainer />

    );
    
}