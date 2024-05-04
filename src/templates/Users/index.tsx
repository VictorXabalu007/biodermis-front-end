import { Users } from "../../components/Users"




export const UsersTemplate = () => {

    return (
        
        <Users.Layout>

            <Users.Header heading="Usuários" />


            <Users.Content>

                <Users.Table />

            </Users.Content>

        </Users.Layout>
        
    );
}