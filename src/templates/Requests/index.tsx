import { Requests } from "../../components/Requests"


export const RequestsTemplate = () => {



    return (

        <Requests.Provider>

            <Requests.Layout>

                <Requests.Header heading="Pedidos" />

                <Requests.Content>

                        <Requests.Cards />

                        <Requests.Table />

                </Requests.Content>


            </Requests.Layout>
            
        </Requests.Provider>
    )


}