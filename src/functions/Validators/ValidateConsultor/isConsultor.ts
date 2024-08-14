
import { UserRole } from "../../../util/userRole";
import { getUserData } from "../../Getters/getUser";




export const isConsultor = () => {


    const user = getUserData();

    return user.usuario.cargo_id === UserRole.CONSULTOR



}