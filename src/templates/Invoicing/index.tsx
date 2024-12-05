import InvoicingCardContainer from "../../components/Invoicing/invoicing-cards";
import InvoicingChartContainer from "../../components/Invoicing/invoicing-chart";
import InvoicingDataContainer from "../../components/Invoicing/invoicing-stats-data";
import { useStateTheme } from "../../context/ThemeProvider";

export const InvoicingTemplate = () => {
	const { setTitle } = useStateTheme();
	setTitle("Faturamento");

	return (
		<>
			<InvoicingCardContainer />

			<InvoicingChartContainer />

			<InvoicingDataContainer />
		</>
	);
};
