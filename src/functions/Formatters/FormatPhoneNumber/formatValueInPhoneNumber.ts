


export const formatInPhoneNumber = (value: string) => {

    return `+55 (${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;

}