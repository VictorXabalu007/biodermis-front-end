
import {cvv} from 'card-validator'

export const validateCVV = (val:string)=> {
    return cvv(val).isValid
}