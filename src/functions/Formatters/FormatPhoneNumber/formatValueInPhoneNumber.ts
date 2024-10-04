
export const formatInPhoneNumber = (value: string) => {

    return `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;

}

export const formatInPhone = (value: string) => {

    value = value.replace(/\D/g, "");
  
    // Adiciona a máscara
    if (value.length <= 10) {
      value = value.replace(/(\d{2})(\d{4})/, "($1) $2");
      value = value.replace(/(\d{4})(\d{1,4})$/, "$1-$2");
    } else {
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    
    return value;
  };
  