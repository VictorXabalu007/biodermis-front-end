import { useMovimentationData } from "../../hooks/useMovimentationData";
import { DataItem } from "./data-item";

import { Flex } from "antd";

const InvoicingDataContainer = () => {
	const { getInputData, getOutputData } = useMovimentationData();

	const inputData = getInputData();
	const outputData = getOutputData();

	// Flatten the data structure to get all items
	const allInputItems = inputData.flatMap(d => d.items).toReversed();
	const allOutputItems = outputData.flatMap(d => d.items).toReversed();
	return (
		<Flex className="mt-10" justify="space-between" align="center" gap={15}>
			<DataItem
				title={"Entradas"}
				subtitle="(entradas totais)"
				cardData={allInputItems}
				cardType="input"
			/>

			<DataItem
				title={"Saídas"}
				subtitle="(saídas totais)"
				cardData={allOutputItems}
				cardType="output"
			/>
		</Flex>
	);
};

export default InvoicingDataContainer;
