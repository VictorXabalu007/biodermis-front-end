import {
	Button,
	Card,
	Flex,
	Skeleton,
	Table,
	type TableColumnType,
	Tooltip,
} from "antd";
import Title from "../../shared/Typography/typography-title";
import { useNavigate } from "react-router-dom";
import { CONSULTORS } from "../../../constants/paths";
import { buildPodium } from "../../shared/Table/functions/buildPodium";
import { Text } from "../../shared/Typography/typography-text";
import { IoIosArrowUp } from "react-icons/io";
import { useConsultorData } from "../../../hooks/users/useConsultorData";

const HomeConsultorsTable = () => {
	const { consultor, isLoading } = useConsultorData();

	const navigate = useNavigate();

	const handleNavigate = () => navigate(CONSULTORS);

	const columns: TableColumnType<UserCredentials>[] = [
		{
			title: "Rank",
			dataIndex: "rank",
			key: "rank",
			sorter: (a, b) => Number.parseInt(a.rank) - Number.parseInt(b.rank),
			render: (value) =>
				value === "1" || value === "2" || value === "3" ? (
					buildPodium(value)
				) : (
					<div className="flex px-2 gap-2 items-center">
						<Text>{value}</Text>

						<IoIosArrowUp className="text-lg text-green-flat" />
					</div>
				),
			align: "center",
		},
		{
			title: "Faturamento",
			dataIndex: "totalfat",
			key: "totalfat",
			render: (value) => `R$ ${Number.parseFloat(value).toFixed(2)}`,
			sorter: (a, b) =>
				Number.parseFloat(a.totalfat) - Number.parseFloat(b.totalfat),
			align: "center",
		},

		{
			title: "Nomes",
			dataIndex: "nome",
			key: "nome",
			sorter: (a, b) => a.nome.localeCompare(b.nome),
			align: "center",
		},
	];

	return (
		<Card
			title={
				<Flex align="center" className="w-full" justify="space-between">
					<Title level={5}>Rank de consultores</Title>
					<Tooltip title="Ir para consultores">
						<Button onClick={handleNavigate}>Gerenciar</Button>
					</Tooltip>
				</Flex>
			}
		>
			{isLoading ? (
				<>
					<Skeleton />
				</>
			) : (
				<>
					<Table
						scroll={{ x: 300 }}
						columns={columns}
						dataSource={consultor}
						pagination={{
							pageSize: 3,
						}}
					/>
				</>
			)}
		</Card>
	);
};

export default HomeConsultorsTable;
