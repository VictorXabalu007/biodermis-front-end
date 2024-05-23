import { UserStatus } from "../../../@types/UserStatus/StatusType";
import { Tag } from "../../shared/Tag";




export const buildStatus = (status: UserStatus) => {

    

    switch(status) {

        case 'ENABLE':

            return (

                <Tag
                content={'Ativo'}
                className="text-green-solid-900 fill-green-solid-900 bg-green-solid-300"
                key="status"
                /> 


            );

        case 'ON_APPROVAL':

            return (

                <Tag
                content={'Em aprovação'}
                className="text-yeallow-solid-900 fill-yeallow-solid-900 bg-yeallow-solid-400"
                key="status"
                /> 


            );

        case 'DISABLE':

            return (

                <Tag
                content={'inativo'}
                className="text-red-solid-800 fill-red-solid-800 bg-red-solid-400"
                key="status"
                /> 


            );



    }



}