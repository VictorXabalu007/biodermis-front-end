import { Flex, Skeleton } from "antd";
import { StatsCard } from "../shared/Card/StatsCard";
import { useInvoicingCardItemHome } from "../../hooks/invoicing/useInvoicingCardItemHome";

export const HomeCardContainer = () => {
	const { items, isLoading } = useInvoicingCardItemHome({
		enableFilterDate: false,
	});

	return (
		<Flex
			className="w-full"
			justify="space-between"
			gap={18}
			align="center"
			wrap
		>
			{items.map((item, index) => {
				return isLoading ? (
					<>
						<Skeleton key={index} />
					</>
				) : (
					<StatsCard.Root key={index}>
						<StatsCard.Header icon={item.icon} title={item.title} />
						<StatsCard.Footer>
							<StatsCard.FooterContent
								headingContent={item.footerHeding}
								textContent={item.footerText}
							/>
						</StatsCard.Footer>
					</StatsCard.Root>
				);
			})}
		</Flex>
	);
};
