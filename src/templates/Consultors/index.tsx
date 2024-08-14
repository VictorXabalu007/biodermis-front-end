
import ConsultorsTable from "../../components/Consultors/consultors-table";
import { useStateTheme } from "../../context/ThemeProvider"


export const ConsultorsTemplate = () => {

    const {setTitle} = useStateTheme();
    setTitle('Consultores');

    return (


        <ConsultorsTable />

        
    )



}