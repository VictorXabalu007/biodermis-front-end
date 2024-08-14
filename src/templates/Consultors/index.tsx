import { Consultors } from "../../components/Consultors"
import { useStateTheme } from "../../context/ThemeProvider"


export const ConsultorsTemplate = () => {

    const {setTitle} = useStateTheme();
    setTitle('Consultores');

    return (


        <Consultors.Table />

        
    )



}