import { Categories } from "../../components/Categories"




export const CategoriesTemplate = () => {


    return(

        <Categories.Layout>


            <Categories.Header
                heading="Categorias"
            />


            <Categories.Content>

                    <Categories.Table />

            </Categories.Content>


        </Categories.Layout>
    )
}