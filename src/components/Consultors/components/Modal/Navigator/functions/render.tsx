import { FormModal } from "../../Form"
import { InovicingModal } from "../../Invoicing"


export const render = (key: string) => {

    switch(key){
        case '1':
            return <FormModal />
        case '2':
            return <InovicingModal />
    }
}