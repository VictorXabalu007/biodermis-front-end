import { Tag } from "../../../../../../../shared/Tag";
import { StatusType } from "../@types/StatusType";



export const buildStatus = (status: StatusType) => {


    switch(status) {

        case 'Ativo':

            return (

                <Tag
                content={status}
                className="text-green-solid-900 fill-green-solid-900 bg-green-solid-300"
                key="status"
                /> 


            );

        case 'Em aprovação':

            return (

                <Tag
                content={status}
                className="text-yeallow-solid-900 fill-yeallow-solid-900 bg-yeallow-solid-400"
                key="status"
                /> 


            );

        case 'Inativo':

            return (

                <Tag
                content={status}
                className="text-red-solid-800 fill-red-solid-800 bg-red-solid-400"
                key="status"
                /> 


            );



    }



}