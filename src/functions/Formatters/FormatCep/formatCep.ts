

export const formatInCep = (cep: string) => {

    const formattedCep = cep.replace(/\D/g, '');
  
   
    if (formattedCep.length === 8) {
   
      return formattedCep.replace(/^(\d{5})(\d{3})$/, '$1-$2');

    } else {

      return formattedCep;


    }

  }
  