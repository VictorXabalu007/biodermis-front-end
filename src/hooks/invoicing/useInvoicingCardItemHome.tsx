import { BsGraphUpArrow } from "react-icons/bs";
import { GoPackage } from "react-icons/go";
import { useProductsData } from "../products/useProductsData";
import { useMemo } from "react";
import type { FilterDateConstraints } from "../../context/RangeDate/RangeDateContext";
import { useRequestsData } from "../orders/useRequestsData";
import { BiMedal } from "react-icons/bi";
import Title from "../../components/shared/Typography/typography-title";

export const useInvoicingCardItemHome = ({
	enableFilterDate = true,
}: FilterDateConstraints = {}) => {
	const {
		getGreatherSoldProduct,
		isLoading,
		getGreatherProductPercentualChange,
	} = useProductsData();

	const {
		getTotalSells,
		getSellPercentualChange,
		getRequestOrderPercentChange,
		getSellStatusChange,
		getRequestOrderStatusChange,
		getTotalOrders,
	} = useRequestsData({ enableFilterDate: true });

	const items = useMemo(
		() => [
			{
				icon: GoPackage,
				title: "Vendas Totais",
				footerHeding: getTotalSells(),
				footerText: "(vendas)",
				percentual: getSellPercentualChange() + "%",
				status: getSellStatusChange(),
			},

			{
				icon: GoPackage,
				title: "Número de pedidos",
				footerHeding: getTotalOrders(),
				footerText: "(pedidos)",
				percentual: getRequestOrderPercentChange() + "%",
				status: getRequestOrderStatusChange(),
			},

			{
				icon: BsGraphUpArrow,
				title: "Item mais vendido",
				footerHeding: <BiMedal size={45} />,
				footerText: (
					<Title>
						{getGreatherSoldProduct().nome || "Não há nenhum item no momento"}
					</Title>
				),
				percentual: getGreatherProductPercentualChange() + "%",
				status: null,
			},
		],
		[getGreatherSoldProduct, getTotalSells],
	);

	return {
		items,
		isLoading,
	};
};
