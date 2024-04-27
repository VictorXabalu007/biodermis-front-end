import { Home } from "../../components/Home"




export const HomeTemplate = () => {


    return (

        <Home.Layout>

            <Home.Header />
            
            <Home.Content >

                    <Home.Cards />

                    <Home.Chart/>
                    
            </Home.Content>

        </Home.Layout>
        
    )


}