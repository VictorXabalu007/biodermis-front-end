import { Empty } from "antd";
import { MoneyDataCard } from "../Card/MoneyDataCard";
import { buildInvoicingIcon } from "./functions/buildInvoicingIcon";
import { useRequestsData } from "../../../hooks/orders/useRequestsData";
import { useEffect, useState } from "react";

export const InovicingModal = ({
	data,
	onTotalFaturamento,
}: {
	data: UserCredentials;
	onTotalFaturamento: (total: number) => void;
}) => {
	const { getRequestDataOfConsultorId } = useRequestsData();

	const consultorData = getRequestDataOfConsultorId(data.id);

	console.log("consultordata", consultorData);

	const [sortOrder, setSortOrder] = useState<string>("");

	const convertDateToISO = (dateStr: string) => {
		const [day, month, year] = dateStr.split("/");
		return `${year}-${month}-${day}`;
	};

	const sortData = (data: any[], order: string) => {
		if (order === "asc") {
			return data.sort((a, b) =>
				convertDateToISO(a.datapedido) > convertDateToISO(b.datapedido)
					? 1
					: -1,
			);
		}
		if (order === "desc") {
			return data.sort((a, b) =>
				convertDateToISO(a.datapedido) < convertDateToISO(b.datapedido)
					? 1
					: -1,
			);
		}
		return data;
	};

	// Ordenar os dados filtrados
	const sortedConsultorData = sortData([...consultorData], sortOrder);
	console.log("sortedConsultorData", sortedConsultorData);

	useEffect(() => {
		// Calcular o total de faturamento
		const totalFaturamento = sortedConsultorData.reduce(
			(acc, item) => acc + Number.parseFloat(item.valor),
			0,
		);
		onTotalFaturamento(totalFaturamento);
	}, [sortedConsultorData, onTotalFaturamento]);

	const handleSortChange = (order: string) => {
		setSortOrder(order); // Altera a direção da ordenação
	};

	return sortedConsultorData.length > 0 ? (
		<div>
			<div className="flex justify-center m-4">
				<button
					type="button"
					className="px-4 py-2 bg-gray-300 rounded-md"
					onClick={() => handleSortChange(sortOrder === "asc" ? "desc" : "asc")}
				>
					Ordenar por Data de Saque (
					{sortOrder === "asc" ? "Crescente" : "Decrescente"})
				</button>
			</div>
			<div className="flex flex-col max-h-[350px] overflow-y-scroll">
				{sortedConsultorData.map((item, index) => (
					<MoneyDataCard.Root key={index}>
						<MoneyDataCard.LeftWrapper>
							{buildInvoicingIcon(item.statuspag)}
							<MoneyDataCard.Text
								title={item.statuspag}
								subtitle={item.datapedido}
							/>
						</MoneyDataCard.LeftWrapper>
						<MoneyDataCard.Value
							cardType="generic"
							value={parseFloat(item.valor)}
						/>
					</MoneyDataCard.Root>
				))}
			</div>
		</div>
	) : (
		<Empty description="Nenhum dado para o consultor nesta data." />
	);
};
