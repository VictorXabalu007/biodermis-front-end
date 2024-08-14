import { WithdrawalRequests } from "../../components/WithdrawalRequests"
import { useStateTheme } from "../../context/ThemeProvider";



export const WithdrawalRequestsTemplate = () => {

    const {setTitle} = useStateTheme();
    setTitle('Pedidos de saque')
    
    return (
 

                <WithdrawalRequests.Table />

    );
}