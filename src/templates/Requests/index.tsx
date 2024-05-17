import { Requests } from "../../components/Requests"


export const RequestsTemplate = () => {



    return (



            <Requests.Layout>

                <Requests.Header heading="Pedidos" />

                <Requests.Content>

                        <Requests.Cards />

                        <Requests.Table />

                </Requests.Content>


            </Requests.Layout>

    );


}