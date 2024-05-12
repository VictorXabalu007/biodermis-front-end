import { number} from 'card-validator';


export const validateCardNumber = (val:string)=>{
    return number(val).isValid;
}