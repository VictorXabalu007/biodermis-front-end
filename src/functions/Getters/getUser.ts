import { UserData } from "../../@types/UserData/UserData";
import { AUTH_USER } from "../../constants/SessionStorageKeys/sessionStorageKeys";


export const user:UserData = JSON.parse(sessionStorage.getItem(AUTH_USER)?? '{}');

export const getUserData = () => {


    return JSON.parse(sessionStorage.getItem(AUTH_USER)?? '{}');



}