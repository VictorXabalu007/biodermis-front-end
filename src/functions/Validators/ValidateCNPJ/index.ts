



export const isCnpj = (value: string) => {
    
    const cnpj = value.replace(/\D/g, '');


    if (cnpj.length !== 14) {
        return false;
    }


    let sum = 0;
    let factor = 5;
    for (let i = 0; i < 12; i++) {
        sum += parseInt(cnpj.charAt(i)) * factor;
        factor = factor === 2 ? 9 : factor - 1;
    }
    let remainder = sum % 11;
    let digit = remainder < 2 ? 0 : 11 - remainder;

    if (parseInt(cnpj.charAt(12)) !== digit) {
        return false;
    }


    sum = 0;
    factor = 6;
    for (let i = 0; i < 13; i++) {
        sum += parseInt(cnpj.charAt(i)) * factor;
        factor = factor === 2 ? 9 : factor - 1;
    }
    remainder = sum % 11;
    digit = remainder < 2 ? 0 : 11 - remainder;

    if (parseInt(cnpj.charAt(13)) !== digit) {
        return false;
    }


    return true;
};
