import { Tag } from "../components/shared/Tag";
import { Tooltip } from "antd";
import { useStatusModal } from "../hooks/users/useStatusModal";

export const buildStatus = (
	status: UserStatus,
	data: UserCredentials,
	enableClick: boolean = true,
) => {
	const { showStatusModal } = useStatusModal({ data });

	const handleClick = () => {
		if (enableClick) {
			showStatusModal();
		}
	};

	const getStatusProps = () => {
		switch (status) {
			case "ativo":
				return {
					className:
						"cursor-pointer text-green-solid-900 fill-green-solid-900 bg-green-solid-300",
					title: "Ativo",
				};

			case "inativo":
				return {
					className:
						"cursor-pointer text-red-solid-800 fill-red-solid-800 bg-red-solid-400",
					title: "Inativo",
				};

			case "em aprovação":
				return {
					className:
						"cursor-pointer text-yeallow-solid-900 fill-yeallow-solid-900 bg-yeallow-solid-400",
					title: "Em aprovação",
				};
			default:
				return {
					className: "",
					title: "Não encontrado",
				};
		}
	};

	return (
		<Tooltip title="Atualizar status">
			<Tag
				content={getStatusProps().title}
				className={getStatusProps().className}
				key="status"
				onClick={handleClick}
			/>
		</Tooltip>
	);
};
