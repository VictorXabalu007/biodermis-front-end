
import { expirationDate} from 'card-validator';

export const validateExpireDate = (date:string)=> {
    return expirationDate(date).isValid
}