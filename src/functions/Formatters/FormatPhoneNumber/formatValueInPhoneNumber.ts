


export const formatInPhoneNumber = (value: string) => {

    return `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;

}