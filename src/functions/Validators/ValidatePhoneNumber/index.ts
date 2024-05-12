

export const validityRawPhoneNumber = (value:string) => {

    return /^\d{11,12}$/.test(value);

} 

export const isPhoneNumber = (value: string) => {

    const digitsOnly = value.replace(/\D/g, '').replace('55', ''); 
    
    return digitsOnly.length === 11 || digitsOnly.length === 12;

    
};