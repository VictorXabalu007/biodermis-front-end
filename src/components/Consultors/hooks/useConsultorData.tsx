import { useQuery } from "@tanstack/react-query";
import { UserCredentials } from "../../../@types/UserData/UserData";
import { useEffect, useState } from "react";
import { getConsultors } from "../service/getConsultors";
import { UserRole } from "../../../util/UserRole";


export const useConsultorData = () => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['consultor'],
        queryFn: getConsultors,
    });

    const [consultor, setConsultor] = useState<UserCredentials[]>([]);

    useEffect(() => {
        if (data) {
          const sortedData = [...data].sort((a, b) => parseFloat(b.totalfat) - parseFloat(a.totalfat))
          .filter(c => c.cargo_id === UserRole.CONSULTOR);
          const rankedData = sortedData.map((d, index) => ({
            ...d,
            rank: String(index + 1),
            status: d.status === 'Ativo' ? 'isAtivo' : d.status
          }));
          setConsultor(rankedData);
        }
      }, 
      [data]);


    const getConsultorName = (id: number) => {

        
        const consultorData = consultor.find(c => c.id === id);
        return consultorData ? consultorData.nome : "Consultor não encontrado";

    };

    const getConsultorIdByName = (name:string) => {

        return consultor.find(c => c.nome.toLowerCase() === name.toLowerCase())?.id || ''
    }

    const isConsultorsEmpty = () => {
      return consultor.length === 0;
    }

    const getConsultorImageById = (id:number) => {

      return consultor.find(c => c.id === id)?.srcperfil || null

    }

    return {
        consultor,
        setConsultor,
        getConsultorName,
        getConsultorIdByName,
        isConsultorsEmpty,
        isLoading,
        isError,
        getConsultorImageById
    };
};