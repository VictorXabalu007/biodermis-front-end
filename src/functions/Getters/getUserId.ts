import { user } from "./getUser"


export const getUserId = () => {


    if(user) {
        return user.usuario.id
    } else {
        return '';
    }

}