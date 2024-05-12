import { isCnpj } from "../ValidateCNPJ";
import { isCpf } from "../ValidateCPF";
import { isEmail } from "../ValidateEmail";
import { isPhoneNumber } from "../ValidatePhoneNumber";


const isRandomKey = (value : string) => {

    return value.replace(' ','').replace(/-/g, '').length === 32;

}

export const isPixKey = (pixkey:string) => {

    return isCpf(pixkey) || 
    isCnpj(pixkey) || isPhoneNumber(pixkey) 
    || isEmail(pixkey) || isRandomKey(pixkey);
 
}