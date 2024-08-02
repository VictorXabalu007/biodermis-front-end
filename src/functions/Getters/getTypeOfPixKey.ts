import { isCnpj } from "../Validators/ValidateCNPJ"
import { isCpf } from "../Validators/ValidateCPF"
import { isEmail } from "../Validators/ValidateEmail"
import { validityRawPhoneNumber } from "../Validators/ValidatePhoneNumber"



export const getTypeOfPixKey = (key:string | undefined) => {

    if(key) {
        if(isCpf(key)){
            return 'cpf'
        } else if (isCnpj(key)){
            return 'cnpj'
        } else if (validityRawPhoneNumber(key)){
            return 'telefone'
        } else if(isEmail(key)) {
            return 'email'
        } 

    } else {
      return 'null'
    }
}