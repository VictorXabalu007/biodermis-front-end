import { Invoicing } from "../../components/Invoicing"
import { useStateTheme } from "../../context/ThemeProvider";



export const InvoicingTemplate = () => {

    const {setTitle} = useStateTheme();
    setTitle('Faturamento');
    
    return (

        <>
        
        <Invoicing.Cards />

        <Invoicing.Chart />

        <Invoicing.Data />
        
        </>



    );
}