import { BsGraphUpArrow } from "react-icons/bs";
import { GoPackage } from "react-icons/go";
import { useProductsData } from "../products/useProductsData";
import { useMemo } from "react";
import type { FilterDateConstraints } from "../../context/RangeDate/RangeDateContext";
import { useRequestsData } from "../orders/useRequestsData";
import { useMovimentationData } from "../useMovimentationData";

export const useInvoicingCardItem = ({
	enableFilterDate = true,
}: FilterDateConstraints = {}) => {
	const { isLoading } = useProductsData();

	const {
		getSellPercentualChange,
		getRequestOrderPercentChange,
		getSellStatusChange,
		getRequestOrderStatusChange,
		getTotalOrders,
	} = useRequestsData({ enableFilterDate });

	const { getInputDataTotal, getOutputDataTotal } = useMovimentationData();

	const items = useMemo(
		() => [
			{
				icon: GoPackage,
				title: "Número de pedidos",
				footerHeding: getTotalOrders(),
				footerText: "(pedidos)",
				percentual: `${getRequestOrderPercentChange()}%`,
				status: getRequestOrderStatusChange(),
			},
			{
				icon: GoPackage,
				title: "Faturamento Total",
				footerHeding: `R$ ${getInputDataTotal()}`,
				footerText: "(entradas)",
				percentual: `${getSellPercentualChange()}%`,
				status: getSellStatusChange(),
			},

			{
				icon: BsGraphUpArrow,
				title: "Saídas Total",
				footerHeding: `R$ ${getOutputDataTotal()}`,
				footerText: "(saídas)",
				percentual: ` ${getSellPercentualChange()}%`,
				status: getSellStatusChange(),
			},
		],
		[
			getTotalOrders,
			getInputDataTotal,
			getOutputDataTotal,
			getRequestOrderPercentChange,
			getSellStatusChange,
			getRequestOrderStatusChange,
			getSellPercentualChange,
		],
	);

	return {
		items,
		isLoading,
	};
};
