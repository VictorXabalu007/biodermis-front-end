import { message } from "antd"


export const downloadCertified = (src: string | null) => {

    if(src === null) {
        message.error('Consultor não possuí certificado!')
    };

    if(src) {
        const link = document.createElement('a');
        link.href = src;
        link.setAttribute('download', 'certificado.pdf');
        document.body.appendChild(link);
        link.click();
    }


}