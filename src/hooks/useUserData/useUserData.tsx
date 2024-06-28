import { useQuery } from "@tanstack/react-query"
import { getUsers } from "../../components/Users/service/getUsers"
import { useEffect, useState } from "react";
import { UserCredentials } from "../../@types/UserData/UserData";


export const useUserData = () => {


    const {data} = useQuery<UserCredentials[]>({
        queryKey: ['user'],
        queryFn: getUsers
    });


    const [user ,setUser] = useState<UserCredentials[]>([]);

    useEffect(()=> {
        if(data){
            setUser(data)
        }
    },[data]);

    const getUserNameById = (id:number) => {


        return user.find(u => u.id === id)?.nome || 'Nome não encontrado'

    }

    const getUserById = (id:number):UserCredentials => {
        return user.find(u => u.id === id) || {} as UserCredentials
    }
    
    return {
        user,
        getUserNameById,
        getUserById
    }

}