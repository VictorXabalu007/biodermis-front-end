import { InvoicingStatus } from "../@types/InvoicingStatus";



export const getCardTitleByStatus = (status:InvoicingStatus) => {

    switch(status) {
        case 'pendente':
            return 'Pendente';
        case 'recebido' :
            return 'Recebido';
    }


}