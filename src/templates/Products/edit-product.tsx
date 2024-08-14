import { Products } from "../../components/Products"




const EditProduct = () => {
  return (

    <Products.Layout>

        <Products.Header heading="Editar produto" />

        <Products.Content>

            <Products.Editor />
            
        </Products.Content>


    </Products.Layout>

  )
}

export default EditProduct