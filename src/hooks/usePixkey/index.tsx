import { useState } from "react";
import { isPixKey } from "../../functions/Validators/ValidatePixKey";
import { isCpf } from "../../functions/Validators/ValidateCPF";
import { isPhoneNumber } from "../../functions/Validators/ValidatePhoneNumber";
import { formatInCPF } from "../../functions/Formatters/FormatCPF/formatValueInCpf";
import { formatInPhoneNumber } from "../../functions/Formatters/FormatPhoneNumber/formatValueInPhoneNumber";
import { formatInCNPJ } from "../../functions/Formatters/FormatCNPJ/formatValueInCnpj";
import { isCnpj } from "../../functions/Validators/ValidateCNPJ";



export const usePixkey = () => {
    
    const [pixKey, setPixkey] = useState('');

    const handlePixkeyChange = (e:React.ChangeEvent<HTMLInputElement>) => {

        const value = e.target.value;

        switch(isPixKey(value)){
            case isCpf(value) :
                setPixkey(formatInCPF(value));
                break
            case isPhoneNumber(value):
                setPixkey(formatInPhoneNumber(value));
                break;
            case isCnpj(value):
                setPixkey(formatInCNPJ(value));
                break;
            default: 
                setPixkey(pixKey)
                break;
        }


    }

    return {
        pixKey,
        handlePixkeyChange
    }
}