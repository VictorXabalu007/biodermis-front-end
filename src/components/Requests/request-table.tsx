import dayjs from "dayjs";
import {
	Button,
	Flex,
	Form,
	message,
	Modal,
	Skeleton,
	Table,
	Typography,
	type TableColumnType,
} from "antd";
const { Text } = Typography;

import { useTableActions } from "../../hooks/useTableActions";
import { TableHeaderWrapper } from "../shared/Table/table-header-wrapper";
import { TableWrapper } from "../shared/Table/table-wrapper";
import { useRequestTable } from "../../hooks/orders/useRequestTable";
import { InputRangePicker } from "../shared/Input/range-picker";
import Select from "../shared/Input/select";
import {
	daysOptions,
	deliveryOptions,
	sellChannelOptions,
	statusOptions,
} from "./util/selectOptions";
import React, { type ChangeEvent, useCallback, useEffect, useState } from "react";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { IoFilter } from "react-icons/io5";
import EyeButton from "../shared/Button/edit-button";
import { buildPaymentStatus } from "./functions/buildPaymentStatus";
import { buildDeliveryStatus } from "./functions/buildDeliveryStatus";
import { NumericFormatter } from "../shared/Formatter/numeric-formatter";
import { buildTotalValue } from "./functions/buildTotalValue";
import DowloadButton from "../shared/Button/download-button";
import WhatzapButton from "../shared/Button/whatzap-button";
import { RequestViewModal } from "./request-view-modal";
import { RequestEditor } from "./update-delivery-request-modal";

import { useRequestUpdate } from "../../hooks/orders/useRequestUpdate";
import { useRequestTableFilters } from "../../hooks/orders/useRequestTableFilters";
import SearchInput from "../shared/Input/search-input";
import { normalizeText } from "../../functions/normalize-text";
import { useRangeDate } from "../../context/RangeDate/RangeDateContext";

const RequestsTable = ({
	children
}: {
	children: React.ReactNode
}) => {
	const { data, setData, isLoading, dowloadPdf } = useRequestTable();

	const { filteredData, setFilteredData, rowClassName, clearAllFilters } =
		useTableActions({
			data,
			setData,
		});

	const [currentRequest, setCurrentRequest] = useState({} as Requests);
	const [openView, setViewOpen] = useState(false);
	const [openEditor, setEditorOpen] = useState(false);

	const handleViewOpen = (record: Requests) => {
		setCurrentRequest(record);
		setViewOpen(true);
	};

	const handleViewClose = () => setViewOpen(false);

	const handleEditorOpen = (record: Requests) => {
		setCurrentRequest(record);
		setEditorOpen(true);
	};
	const handleEditorClose = () => setEditorOpen(false);

	const handleWhatsAppClick = useCallback((phone: string | null) => {
		if (phone) {
			const sanitizedPhone = phone.replace(/\D/g, "");
			const whatsappLink = `https://wa.me/${sanitizedPhone}`;
			window.open(whatsappLink, "_blank");
		} else {
			message.error("Número de telefone inválido ou não informado.");
		}
	}, []);

	const columns: TableColumnType<Requests>[] = [
		{
			dataIndex: "id",
			title: "Pedidos",
			render: (value) => (value < 10 ? `0${value}` : value),
			sorter: (a, b) => a.id - b.id,
			align: "center",
			defaultSortOrder: "descend",
		},
		{
			dataIndex: "nomeconsultor",
			title: "Consultor",
			sorter: (a, b) => {
				if (a.nomeconsultor !== null && b.nomeconsultor !== null) {
					return a.nomeconsultor.localeCompare(b.nomeconsultor);
				} else {
					return -1;
				}
			},
			render: (value) => value || "Consultor nao informado",
		},
		{
			dataIndex: "nomecliente",
			title: "Cliente",

			sorter: (a, b) => {
				if (a.nomecliente !== null && b.nomecliente !== null) {
					return a.nomecliente.localeCompare(b.nomecliente);
				} else {
					return -1;
				}
			},
			render: (value) => value || "Cliente não informado",
		},
		{
			dataIndex: "statuspag",
			key: "statuspag",
			title: "Status Pagamento",
			render: (value) => buildPaymentStatus(value),
		},
		{
			dataIndex: "statusentrega",
			key: "statusentrega",
			title: "Status Entrega",
			render: (value, record) => {
				return buildDeliveryStatus({
					status: value,
					handleEditorOpen: () => handleEditorOpen(record),
					request: record,
				});
			},
		},
		{
			dataIndex: "modelo",
			key: "modelo",
			title: "Modelo",
		},
		{
			dataIndex: "valorfrete",
			key: "valorfrete",
			title: "Valor frete",
			render: (value) => <NumericFormatter value={parseFloat(value)} />,
			sorter: (a, b) => parseFloat(a.valorfrete) - parseFloat(b.valorfrete),
		},
		{
			dataIndex: "formapag_id",
			key: "formapag_id",
			title: "Forma de Pagamento",
			render: (value, record) => buildTotalValue(record.valor, value),
			align: "center",
		},

		{
			key: "actions",
			title: "Ações",
			dataIndex: "actions",
			render: (_, record) => (
				<Flex align="center" gap={3}>
					<EyeButton onClick={() => handleViewOpen(record)} />

					<DowloadButton onClick={() => dowloadPdf(record)} />

					<WhatzapButton
						className={`${!record.telefone ? "opacity-50" : ""} `}
						disabled={!record.telefone}
						onClick={() => handleWhatsAppClick(record.telefone)}
					/>
				</Flex>
			),
		},
	];

	const { contextHolder, control, handleSubmit, errors, onSubmit } =
		useRequestUpdate({
			request: currentRequest,
		});

	const {
		handleDaysChange,
		handleOrderStatusChange,
		showFilters,
		handleOpenFilters,
		handlePaymentStatusChange,
		handleSellChannelChange,
		setShowFilters,
		updateDateFromPicker,
		resetAllFilters,
	} = useRequestTableFilters({
		setFilteredData,
	});

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		const value = normalizeText(e.target.value);

		if (!value.trim()) {
			// Se a busca estiver vazia, aplicamos apenas os outros filtros já ativos
			resetAllFilters();
			return;
		}

		// Filtramos com base na pesquisa, mas mantemos outros filtros ativos
		const filtered = data.filter((item) => {
			const id = normalizeText(String(item.id));
			const consultor = item.nomeconsultor
				? normalizeText(item.nomeconsultor.toString())
				: "";
			const cliente = item.nomecliente
				? normalizeText(item.nomecliente ?? "")
				: "";
			const lowId = parseInt(id) < 10 ? "0" + id : id;

			return (
				id.includes(value) ||
				lowId.includes(value) ||
				consultor.includes(value) ||
				cliente.includes(value)
			);
		});

		setFilteredData(filtered);
	};
	const { state, getDates } = useRangeDate()
	const [dateRange, setDateRange] = useState([
		dayjs().subtract(1, "month"),
		dayjs(),
	] as [dayjs.Dayjs, dayjs.Dayjs]);
	useEffect(() => {
		if (state.rangeDate[0].length > 0) {
			const startDate = dayjs(state.rangeDate[0], 'DD/MM/YYYY');
			const endDate = dayjs(state.rangeDate[1], 'DD/MM/YYYY');
			console.log({ state, startDate, endDate })
			setDateRange([startDate, endDate]);
		} else {
			setDateRange([dayjs().subtract(1, "month"), dayjs()]);
		}
	}, [state])
	return (
		<>
			<Flex wrap>
				<Flex gap={10}>
					<Text strong>
						{state.rangeDate[0].length > 0
							? "Dados dos dias: "
							: "Dados do dia: "}
					</Text>

					<Text>
						{state.rangeDate[0].length > 0
							? `${getDates(state).startDate} 
					 até ${getDates(state).endDate}`
							: new Date().toLocaleDateString()}
					</Text>
				</Flex>

				<div className="lg:ms-auto">
					<InputRangePicker
						value={dateRange && dateRange[0].isAfter('1970-01-01') ? dateRange : undefined}
						onChange={(dates) => {
							if (dates) {
								if (!dates[0] || !dates[1]) return;
								const startDate = dates[0].format("DD/MM/YYYY");
								const endDate = dates[1].format("DD/MM/YYYY");
								setDateRange([dates[0], dates[1]]);

								// Convertemos as datas para o formato de Data do JavaScript
								const jsStartDate = new Date(dates[0].year(), dates[0].month(), dates[0].date());
								const jsEndDate = new Date(dates[1].year(), dates[1].month(), dates[1].date());

								// Atualizamos o filtro de intervalo de datas, mas mantemos os outros filtros
								updateDateFromPicker(jsStartDate, jsEndDate);
							}
						}}
					/>
				</div>
			</Flex>
			{children}
			{contextHolder}
			<TableWrapper>
				<TableHeaderWrapper heading="Pedidos">
					<Flex wrap justify="space-between" align="center">
						<Flex
							align="center"
							gap={10}
							className="w-full md:flex-nowrap flex-wrap"
							wrap
						>
							<Flex
								align="start"
								justify="space-between"
								className="w-full flex-wrap"
								gap={10}
							>
								<Flex gap={15} vertical>
									<Flex gap={15}>
										<SearchInput
											onChange={handleSearch}
											placeholder="Pesquisar por pedido, consultor, cliente etc"
										/>

										{!showFilters && (
											<Flex gap={10} className=" flex-wrap">
												<Button size="large" onClick={handleOpenFilters}>
													<Flex gap={5} align="center">
														Filtros avançados
														<IoFilter />
													</Flex>
												</Button>
												{/* <InputRangePicker
													defaultValue={[
														dayjs().subtract(1, "month"),
														dayjs(),
													]}
												/> */}

											</Flex>
										)}

										{showFilters && (
											<Flex gap={10} className=" flex-wrap">
												<Button
													size="large"
													onClick={() => {
														resetAllFilters();
														setShowFilters(false);
													}}
												>
													<Flex gap={5} align="center">
														Ocultar filtros
														<MdOutlineCancelPresentation />
													</Flex>
												</Button>
												{/* <InputRangePicker
													defaultValue={[
														dayjs().subtract(1, "month"),
														dayjs(),
													]}
												/> */}

											</Flex>
										)}
									</Flex>

									<div className="flex items-center flex-wrap gap-4">
										{showFilters && (
											<Flex gap={5}>
												<Select
													className="w-full md:w-auto"
													options={daysOptions}
													defaultValue={daysOptions[0]}
													onChange={handleDaysChange}
												/>

												<Select
													className="w-full md:w-[220px]"
													options={statusOptions}
													defaultValue={statusOptions[0]}
													onChange={handlePaymentStatusChange}
												/>

												<Select
													className="w-full md:w-[200px]"
													options={deliveryOptions}
													onChange={handleOrderStatusChange}
													defaultValue={deliveryOptions[0]}
												/>

												<Select
													className="w-full md:w-auto"
													options={sellChannelOptions}
													defaultValue={sellChannelOptions[0]}
													onChange={handleSellChannelChange}
												/>
											</Flex>
										)}
									</div>
								</Flex>

								{/* <InputRangePicker /> */}
							</Flex>
						</Flex>
					</Flex>
				</TableHeaderWrapper>

				{isLoading ? (
					<Skeleton />
				) : (
					<Table
						dataSource={filteredData}
						columns={columns}
						rowClassName={rowClassName}
						scroll={{ x: 300 }}
					/>
				)}
			</TableWrapper>

			<Modal
				open={openView}
				onCancel={handleViewClose}
				closable
				maskClosable
				footer={null}
				width={570}
			>
				<RequestViewModal requests={currentRequest} />
			</Modal>

			<Modal
				open={openEditor}
				closable
				maskClosable
				onCancel={handleEditorClose}
				width={600}
				onOk={handleSubmit(onSubmit)}
			>
				<Form layout="vertical">
					<RequestEditor
						errors={errors}
						control={control}
						requestId={currentRequest.id}
					/>
				</Form>
			</Modal>
		</>
	);
};

export default RequestsTable;
