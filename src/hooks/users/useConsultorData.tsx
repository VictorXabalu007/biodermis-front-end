import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getConsultors } from "../../components/Consultors/service/getConsultors";
import { UserRole } from "../../util/userRole";
import { API_URL } from "../../service/url";
import { isValidURL } from "../../functions/Validators/isLink";

export const useConsultorData = (status?: string) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["consultor", status == '' ? "todos" : status],
		queryFn: () => getConsultors(status || ""),
	});
	const [consultor, setConsultor] = useState<UserCredentials[]>([]);
	useEffect(() => {
		if (data) {
			// Filtrar apenas consultores
			const filteredData = data.filter(
				(c: any) => c.cargo_id === UserRole.CONSULTOR
			);

			// Processar URLs de perfil
			const processedData = filteredData.map((d: any) => {
				const { srcperfil } = d;
				const isLink = srcperfil !== null ? isValidURL(srcperfil) : false;
				return {
					...d,
					status: d.status.toLocaleLowerCase() as UserStatus,
					srcperfil: isLink ? srcperfil : `${API_URL}/${srcperfil}`,
				};
			});
			setConsultor(processedData);
		}
	}, [data]);
	const getConsultorName = (id: number) => {
		const consultorData = consultor.find((c) => c.id === id);
		return consultorData ? consultorData.nome : "Consultor não encontrado";
	};

	const getConsultorIdByName = (name: string) => {
		return (
			consultor.find((c) => c.nome.toLowerCase() === name.toLowerCase())?.id ||
			""
		);
	};

	const isConsultorsEmpty = () => {
		return consultor.length === 0;
	};

	const getConsultorImageById = (id: number) => {
		return consultor.find((c) => c.id === id)?.srcperfil || null;
	};

	const getConsultorById = (id: number): UserCredentials | null => {
		return consultor.find((c) => c.id === id) || null;
	};

	return {
		consultor,
		setConsultor,
		getConsultorName,
		getConsultorIdByName,
		isConsultorsEmpty,
		isLoading,
		isError,
		getConsultorImageById,
		getConsultorById,
	};
};
