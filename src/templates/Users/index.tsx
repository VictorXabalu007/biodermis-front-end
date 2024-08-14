import { Users } from "../../components/Users"
import { useStateTheme } from "../../context/ThemeProvider";




export const UsersTemplate = () => {

    const {setTitle} = useStateTheme();
    setTitle('Usuários');

    return (
        

        <Users.Table />

      
        
    );
}