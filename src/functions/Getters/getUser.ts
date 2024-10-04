
import { AUTH_USER } from "../../constants/sessionStorageKeys";


export const user:User = JSON.parse(sessionStorage.getItem(AUTH_USER)?? '{}');

export const getUserData = () => {


    return JSON.parse(sessionStorage.getItem(AUTH_USER)?? '{}');



}