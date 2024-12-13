
export const formatInCPF = (value: string) => {

    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

}
export const formatFieldValueInCpf = (value: string) => {
  // Remove todos os caracteres que não são números
  value = value.replace(/\D/g, "");

  // Limita o valor a no máximo 11 números
  value = value.slice(0, 11);

  // Aplica a formatação do CPF
  if (value.length <= 11) {
    value = value
      .replace(/^(\d{3})(\d)/, "$1.$2") // Primeiro ponto
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3") // Segundo ponto
      .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})$/, "$1.$2.$3-$4"); // Traço
  }

  return value;
};
