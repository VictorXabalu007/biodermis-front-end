
import WithdrawalTable from "../../components/WithdrawalRequests/withdrawal-table";
import { useStateTheme } from "../../context/ThemeProvider";



export const WithdrawalRequestsTemplate = () => {

    const {setTitle} = useStateTheme();
    setTitle('Pedidos de saque')
    
    return (
 
       <WithdrawalTable />

    );
}