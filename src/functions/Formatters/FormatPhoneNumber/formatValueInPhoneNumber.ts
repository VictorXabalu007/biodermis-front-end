export const formatPhoneNumber = (value: string) => {
  // Remove todos os caracteres não numéricos
  const onlyNumbers = value.replace(/\D/g, "");

  // Aplica a máscara com base no comprimento
  if (onlyNumbers.length <= 10) {
    // Formato para números com DDD e 8 dígitos: (XX) XXXX-XXXX
    return onlyNumbers.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  }
  // Formato para números com DDD e 9 dígitos: (XX) XXXXX-XXXX
  return onlyNumbers.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
};

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
