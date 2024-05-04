import { Invoicing } from "../../components/Invoicing"



export const InvoicingTemplate = () => {

    return (

        <Invoicing.Layout>

            <Invoicing.Header heading="Faturamento" />

            <Invoicing.Content >

                <Invoicing.Cards />

                <Invoicing.Chart />

                <Invoicing.Data />

            </Invoicing.Content>

        </Invoicing.Layout>

    );
}