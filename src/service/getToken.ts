import { UserData } from "../@types/UserData/UserData";
import { AUTH_USER } from "../constants/SessionStorageKeys/sessionStorageKeys"



export const getHeaders = () => {


    const userData:UserData = JSON.parse(sessionStorage.getItem(AUTH_USER)?? '{}');

    
    const data = {
        headers: {
            'Authorization': `Bearer ${userData.token}`
        }
    }

    return data.headers || '';



}