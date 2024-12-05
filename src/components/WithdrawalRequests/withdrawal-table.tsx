import { useTableData } from "../../hooks/withdraw/useTableData";
import { TableWrapper } from "../shared/Table/table-wrapper";
import {
	Avatar,
	Button,
	Flex,
	Form,
	Modal,
	Skeleton,
	Table,
	TableColumnProps,
	Tooltip,
} from "antd";

import { TableHeaderWrapper } from "../shared/Table/table-header-wrapper";
import { withdrawalSelectOptions } from "./util/selectOptions";
import { InputRangePicker } from "../shared/Input/range-picker";
import { useTableActions } from "../../hooks/useTableActions";

import { NumericFormatter } from "../shared/Formatter/numeric-formatter";
import { UploadComprovantModal } from "./upload-comprovant-modal";
import { ChangeEvent, useEffect, useState } from "react";
import { Text } from "../shared/Typography/typography-text";
import { IoIosArrowForward, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useComprovantRegister } from "../../hooks/withdraw/useComprovantRegister";
import FilterButton from "../shared/Button/filter-button";
import Select from "../shared/Input/select";
import { useConsultorData } from "../../hooks/users/useConsultorData";
import SearchInput from "../shared/Input/search-input";
import { urlParams } from "../../util/urlParams";
import { normalizeText } from "../../functions/normalize-text";
import { useNavigate } from "react-router-dom";

const WithdrawalTable = () => {
	const { withDrawData, setWithdrawData, isLoading } = useTableData();
	const [searchValue, setSearchValue] = useState<string>("");

	const [currentWithdraw, setCurrentWithdraw] = useState<WithDrawal>(
		{} as WithDrawal,
	);

	const navigate = useNavigate();
	const { filteredData, setFilteredData, clearAllFilters, isFiltered } =
		useTableActions({
			data: withDrawData,
			setData: setWithdrawData,
		});

	const { getConsultorImageById } = useConsultorData();

	const handleStatusChange = (status: string) => {
		if (status === "") {
			setFilteredData(withDrawData);
		} else {
			setFilteredData(
				withDrawData.filter(
					(d) => d.status === status || d.datasaque === status,
				),
			);
		}
	};

	const [open, setOpen] = useState(false);
	const handleOpen = (record: WithDrawal) => {
		setCurrentWithdraw(record);
		setOpen(true);
	};
	const handleClose = () => {
		setCurrentWithdraw({} as WithDrawal);
		setOpen(false);
	};

	const { control, errors, handleSubmit, onSubmit, contextHolder } =
		useComprovantRegister({
			id: currentWithdraw.id,
		});

	const columns: TableColumnProps<WithDrawal>[] = [
		{
			dataIndex: "consultor_id",
			title: "Perfil Consultor",
			key: "consultor_id",
			render: (_, record) => {
				return (
					<Flex justify="center" align="center">
						<Tooltip title={record.nome_consultor}>
							<Avatar
								style={{
									maxWidth: "30px",
								}}
								src={getConsultorImageById(record.consultor_id) as string}
							/>
						</Tooltip>
					</Flex>
				);
			},
			align: "center",
		},
		{
			dataIndex: "nome_consultor",
			title: "Nome Consultor",
			key: "nome_consultor",

			align: "center",
		},
		{
			dataIndex: "datasaque",
			key: "datasaque",
			sorter: (a, b) => {
				const dateA = new Date(a.datasaque.split("/").reverse().join("-")); // Converte de DD/MM/YYYY para YYYY-MM-DD
				const dateB = new Date(b.datasaque.split("/").reverse().join("-"));
				return dateA.getTime() - dateB.getTime();
			},
			title: "Data saque",
		},
		{
			dataIndex: "saldo_disp",
			key: "saldo_disp",
			title: "Saldo disponível",
			sorter: (a, b) => parseFloat(a.saldo_disp) - parseFloat(b.saldo_disp),
			render: (value) => <NumericFormatter value={parseFloat(value)} />,
		},
		{
			dataIndex: "valorsaque",
			key: "valorsaque",
			title: "Valor do saque",
			sorter: (a, b) => parseFloat(a.valorsaque) - parseFloat(b.valorsaque),
			render: (value) => <NumericFormatter value={parseFloat(value)} />,
		},
		{
			dataIndex: "status",
			key: "status",
			title: "Status",
			render: (value, record) => {
				switch (value) {
					case "realizado":
						return (
							<div className="px-3 py-2 bg-green-solid-300/75 rounded-md max-w-[120px] flex items-center gap-2">
								<Text className="text-green-solid-900">Pago</Text>

								<IoMdCheckmarkCircleOutline className="text-green-solid-900 text-xl" />
							</div>
						);

					case "pendente":
						return (
							<Button onClick={() => handleOpen(record)}>
								<Flex gap={5} align="center">
									Efetuar pagamento
									<IoIosArrowForward />
								</Flex>
							</Button>
						);
				}
			},
		},
	];

	const onFilter = (value: string) => {
		const filtered = withDrawData.filter((item) => {
			const name = normalizeText(item.nome_consultor);
			const price = normalizeText(item.valorsaque);
			const date = normalizeText(item.datasaque);

			const dateMatch = date.replace("/", "").replace("/", "").includes(value);

			return name.includes(value) || price.includes(value) || dateMatch;
		});

		setFilteredData(filtered);
	};

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		const value = normalizeText(e.target.value);
		setSearchValue(value);
		urlParams.set("search", value);
		navigate({
			pathname: window.location.pathname,
			search: `${urlParams.toString()}`,
		});
		onFilter(value);
	};

	useEffect(() => {
		const search = urlParams.get("search");
		const defaultStatus = withdrawalSelectOptions[1]?.value || "";

		if (search) {
			setSearchValue(search);
			onFilter(search);
		} else if (defaultStatus) {
			handleStatusChange(defaultStatus);
		}
	}, [withDrawData, urlParams]);

	return (
		<>
			<TableWrapper>
				{contextHolder}

				<TableHeaderWrapper heading="Pedidos de saque">
					<Flex wrap justify="space-between" align="center">
						<Flex gap={15}>
							<SearchInput
								value={searchValue}
								placeholder="Pesquisar por preço ou nome"
								onChange={handleSearch}
							/>
							<Select
								className="w-full md:w-auto"
								options={withdrawalSelectOptions}
								defaultValue={withdrawalSelectOptions[1]}
								onChange={handleStatusChange}
							/>

							<FilterButton
								onFilterCancel={clearAllFilters}
								isFiltered={isFiltered}
							/>
						</Flex>
						<InputRangePicker />
					</Flex>
				</TableHeaderWrapper>

				{isLoading ? (
					<Skeleton active />
				) : (
					<Table
						dataSource={filteredData?.map((item, index) => ({
							...item,
							key: index,
						}))}
						columns={columns}
						scroll={{ x: 1000 }}
						rowKey="key"
						sortDirections={["ascend", "descend"]}
					/>
				)}
			</TableWrapper>

			<Modal
				open={open}
				onCancel={handleClose}
				onOk={handleSubmit(onSubmit)}
				okButtonProps={{ style: { width: "49%" } }}
				cancelButtonProps={{ style: { width: "49%" } }}
			>
				<Form layout="vertical">
					<UploadComprovantModal
						withdraw={currentWithdraw}
						errors={errors}
						control={control}
					/>
				</Form>
			</Modal>
		</>
	);
};

export default WithdrawalTable;
