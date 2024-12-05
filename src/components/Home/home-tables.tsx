import { Flex } from "antd";
import HomeConsultorsTable from "./homeTables/consultors-table";
import HomeWithdrawTable from "./homeTables/withdraw-table";

const HomeTables = () => {
	return (
		<Flex gap={15} vertical className="max-h-[550px] overflow-auto">
			<HomeConsultorsTable />

			<HomeWithdrawTable />
		</Flex>
	);
};

export default HomeTables;
