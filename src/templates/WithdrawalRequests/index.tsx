import { WithdrawalRequests } from "../../components/WithdrawalRequests"



export const WithdrawalRequestsTemplate = () => {

    return (
        <WithdrawalRequests.Layout>

            <WithdrawalRequests.Header heading="Pedidos de saque" />

            <WithdrawalRequests.Content>

                <WithdrawalRequests.Table />

            </WithdrawalRequests.Content>

        </WithdrawalRequests.Layout>
    );
}