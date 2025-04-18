import { TfiWallet } from "react-icons/tfi";
import { Text } from "../shared/Text";
import type { MoneyCardType } from "../shared/Card/MoneyDataCard/@types/MoneyCardType";
import { MoneyDataCard } from "../shared/Card/MoneyDataCard";
import { Card, Empty, Flex } from "antd";
import { ContainerPagination } from "../shared/Pagination/container-pagination";
import { usePagination } from "../../hooks/usePagination";
import Title from "../shared/Typography/typography-title";

type DataItemProps = {
	title: string;
	subtitle: string;
	cardData: {
		id: number;
		tipo: string;
		valor: string;
		saque_id: number | null;
		pedido_id: number | null;
		datarealizado: string;
	}[];
	cardType: MoneyCardType;
};

const PAGE_SIZE = 5;

export const DataItem = ({
	title,
	subtitle,
	cardData,
	cardType,
}: DataItemProps) => {
	const paginationItems = usePagination({
		data: cardData,
		pageSize: PAGE_SIZE,
	});

	const handlePageChange = (page: number) => {
		paginationItems.setCurrentPage(page);
	};

	// Format date from YYYY-MM-DD to DD/MM/YYYY
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('pt-BR');
	};

	// Function to determine what to display as title and subtitle
	const getDisplayInfo = (item: any) => {
		const title = formatDate(item.datarealizado);
		let subtitle = '';

		if (cardType === "input") {
			subtitle = item.pedido_id ? `Pedido #${item.pedido_id}` : 'Entrada';
		} else {
			subtitle = item.saque_id ? `Saque #${item.saque_id}` : 'Saída';
		}

		return { title, subtitle };
	};

	return (
		<Card
			style={{
				flex: 1,
				minHeight: "600px",
			}}
		>
			<Flex align="center" gap={15} className="mb-10">
				<div className="bg-brand-purple/25 rounded-md p-3">
					<TfiWallet className="text-brand-purple" />
				</div>
				<Title level={4} className="font-semibold text-black">
					{title}
				</Title>

				<Text.Root className="font-light">
					<Text.Content content={subtitle} />
				</Text.Root>
			</Flex>

			{paginationItems.currentItems.length === 0 ? (
				<>
					<Empty description="Sem dados no momento" />
				</>
			) : (
				paginationItems.currentItems.map((data) => {
					const displayInfo = getDisplayInfo(data);

					return (
						<MoneyDataCard.Root key={data.id}>
							<MoneyDataCard.LeftWrapper>
								<MoneyDataCard.Icon cardType={cardType} />

								<MoneyDataCard.Text
									title={displayInfo.title}
									subtitle={displayInfo.subtitle}
								/>
							</MoneyDataCard.LeftWrapper>

							<MoneyDataCard.Value
								cardType={cardType}
								value={parseFloat(data.valor)}
							/>
						</MoneyDataCard.Root>
					);
				})
			)}

			{paginationItems.currentItems.length > 0 && (
				<ContainerPagination
					currentPage={paginationItems.currentPage}
					totalItems={paginationItems.totalPages}
					onPageChange={handlePageChange}
					style={{
						marginTop: "10px",
						marginLeft: "0 auto",
					}}
				/>
			)}
		</Card>
	);
};
