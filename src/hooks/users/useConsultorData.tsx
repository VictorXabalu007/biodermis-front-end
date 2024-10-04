import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getConsultors } from "../../components/Consultors/service/getConsultors";
import { UserRole } from "../../util/userRole";
import { API_URL } from "../../service/url";
import { isValidURL } from "../../functions/Validators/isLink";


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
          const rankedData = sortedData.map((d, index) => {
            
            const {srcperfil} = d;
            const isLink = srcperfil !== null ? isValidURL(srcperfil) : false;

            return {
              ...d,
              rank: String(index + 1),
              status: d.status.toLocaleLowerCase() as UserStatus,
              srcperfil: isLink ? srcperfil : `${API_URL}/${srcperfil}`
            }

          });
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

    const getConsultorById = (id:number):UserCredentials | null => {
      return consultor.find(c => c.id === id) || null
    }

    return {
        consultor,
        setConsultor,
        getConsultorName,
        getConsultorIdByName,
        isConsultorsEmpty,
        isLoading,
        isError,
        getConsultorImageById,
        getConsultorById
    };
};