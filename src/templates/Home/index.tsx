import { Home } from "../../components/Home"



export const HomeTemplate = () => {

    return (

            <Home.Layout>

                <Home.Header heading="Home" />
                
                <Home.Content >

                        <Home.Cards />
                        
                        <Home.Wrapper>
                        
                            <Home.Chart/>
                            <Home.Tables />
                        
                        </Home.Wrapper> 
               
                    
                </Home.Content>

            </Home.Layout>
     
    );


}