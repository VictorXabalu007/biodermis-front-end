import { UserCredentials } from "../../../@types/UserData/UserData";
import { UserStatus } from "../../../@types/UserStatus/StatusType";
import { Tag } from "../../shared/Tag";
import { useStatusModal } from "../hooks/useStatusModal";


export const buildStatus = (status: UserStatus, data:UserCredentials, enableClick:boolean = true) => {

    
    const {showStatusModal} = useStatusModal({data});

    const handleClick = () => {

        if(enableClick){
            showStatusModal();
        }
    }

    switch(status) {

        case 'isAtivo':

            return (

                <Tag
                content={'Ativo'}
                className="cursor-pointer text-green-solid-900 fill-green-solid-900 bg-green-solid-300"
                key="status"
                onClick={handleClick}
                /> 


            );


        case 'Inativo':
        case 'inativo':

            return (

                <Tag
                content={'Inativo'}
                className="cursor-pointer text-red-solid-800 fill-red-solid-800 bg-red-solid-400"
                key="status"
                onClick={handleClick}
                /> 


            );

        case 'Em aprovação':
            return (

                <Tag
                content={'Em aprovação'}
                className="cursor-pointer text-yeallow-solid-900 fill-yeallow-solid-900 bg-yeallow-solid-400"
                key="status"
                onClick={handleClick}
                /> 


            );



    }



}