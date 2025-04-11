import { useEffect, useState } from "react";
import { TableWrapper } from "../shared/Table/table-wrapper";
import {
	Button,
	Flex,
	Image,
	Modal,
	Skeleton,
	Table,
	type TableColumnsType,
	Tooltip,
} from "antd";
import { useTableActions } from "../../hooks/useTableActions";
import { buildPodium } from "../shared/Table/functions/buildPodium";
import { userImageFallback } from "../../util/projectImage";
import { buildStatus } from "../../functions/buildStatus";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { colors } from "../../theme/colors";
import { TableHeaderWrapper } from "../shared/Table/table-header-wrapper";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { userStatusOptions } from "./util/selectOptions";
import { REGISTER_CONSULTOR } from "../../constants/paths";
import { ModalNavigator } from "../shared/Modal/modal-navigator";

import DowloadButton from "../shared/Button/download-button";
import { downloadCertified } from "../../functions/download-certified";
import { useConsultorData } from "../../hooks/users/useConsultorData";
import { normalizeText } from "../../functions/normalize-text";
import SearchInput from "../shared/Input/search-input";
import { urlParams } from "../../util/urlParams";
import FilterButtons from "./util/button-filter";
import { useRequestsData } from "../../hooks/orders/useRequestsData";

const ConsultorsTable = () => {
	const { consultor, setConsultor, isLoading } = useConsultorData();
	const { data, getTotalByConsultorId, getRankPositionByConsultorId } = useRequestsData();
	const { consultor: initialData } = useConsultorData();
	const [searchValue, setSearchValue] = useState("");
	const [selectedStatus, setSelectedStatus] = useState("ativo");

	const { filteredData, setFilteredData } = useTableActions({
		data: consultor,
		setData: setConsultor,
	});

	useEffect(() => {
		if (consultor) {
			const filtered = consultor.filter(
				(item) => item.status === selectedStatus,
			);

			setFilteredData(filtered);
		}
	}, [consultor, initialData]);

	const navigate = useNavigate();

	const [open, setOpen] = useState(false);
	const [currentConsultor, setCurrentConsultor] = useState<UserCredentials>(
		{} as UserCredentials,
	);

	const showFormModal = ({ data }: { data: UserCredentials }) => {
		setCurrentConsultor(data);
		setOpen(true);
	};

	const handleEditClick = (data: UserCredentials) => {
		showFormModal({ data });
	};

	const handleStatusChange = (selectedOption: string) => {
		setSelectedStatus(selectedOption);

		if (selectedOption === "") {
			setFilteredData(initialData);
		} else {
			const filtered = consultor.filter(
				(item) => item.status === selectedOption,
			);
			setFilteredData(filtered);
		}
	};

	const columns: TableColumnsType<UserCredentials> = [
		{
			title: "Rank",
			dataIndex: "rank",
			key: "rank",
			sorter: (a, b) => getRankPositionByConsultorId(a.id) - getRankPositionByConsultorId(b.id),
			render: (value, { id }) => buildPodium(getRankPositionByConsultorId(Number(id)).toString()),
			align: "center",
		},
		{
			title: "Faturamento",
			dataIndex: "totalfat",
			key: "totalfat",
			render: (value, { id }) => `R$ ${getTotalByConsultorId(id).toFixed(2)}`,
			sorter: (a, b) =>
				getTotalByConsultorId(a.id) - getTotalByConsultorId(b.id),
			align: "center",
		},

		{
			dataIndex: "id",
			title: "Pedidos",
			render: (value) => (value < 10 ? `0${value}` : value),
			sorter: (a, b) => a.id - b.id,
			align: "center",
		},
		{
			title: "Perfil",
			dataIndex: "srcperfil",
			key: "srcperfil",
			render: (value, record) => (
				<Tooltip title={record.nome}>
					<Image
						src={value}
						fallback={userImageFallback}
						style={{
							maxWidth: "30px",
						}}
						preview={false}
					/>
				</Tooltip>
			),
		},

		{
			title: "Nomes",
			dataIndex: "nome",
			key: "nome",
			sorter: (a, b) => a.nome.localeCompare(b.nome),
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Telefone",
			dataIndex: "telefone",
			key: "telefone",
			sorter: (a, b) => a.nome.localeCompare(b.nome),
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (value, record) => buildStatus(value, record),
		},
		{
			title: "Ações",
			dataIndex: "actions",
			key: "actions",
			render: (_, record) => (
				<Flex align="center">
					<Tooltip title="Editar">
						<Button
							style={{ color: colors.primaryPurple }}
							type="text"
							onClick={() => handleEditClick(record)}
						>
							<HiOutlinePencilAlt size={20} />
						</Button>
					</Tooltip>

					{record.cargo_id === 4 && (
						<DowloadButton
							title="Baixar certificado"
							onClick={() => downloadCertified(record.srccert)}
							outlined={false}
						/>
					)}
				</Flex>
			),
		},
	];

	const onFilter = (value: string) => {
		const filteredByStatus = consultor.filter(
			(item) => item.status === selectedStatus,
		);
		const filtered = filteredByStatus.filter((item) => {
			const name = normalizeText(item.nome);
			const email = normalizeText(item.email);
			const phone = normalizeText(item.telefone);

			return (
				name.includes(value) || email.includes(value) || phone.includes(value)
			);
		});

		setFilteredData(filtered);
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
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

		if (search) {
			setSearchValue(search);
			onFilter(search);
		}
	}, [consultor, selectedStatus]);

	return (
		<>
			<TableWrapper>
				<TableHeaderWrapper heading="Lista de consultores">
					<Flex wrap justify="space-between" align="center">
						<FilterButtons
							options={userStatusOptions}
							onFilterChange={handleStatusChange}
						/>
					</Flex>

					<Flex wrap justify="space-between" align="center">
						<Flex align="center" gap={10} className="md:flex-nowrap flex-wrap">
							<SearchInput
								value={searchValue}
								placeholder="Pesquisar por nome, email, telefone"
								onChange={handleSearch}
							/>
							{/* <Select
								options={userStatusOptions}
								onChange={handleStatusChange}
								defaultValue={userStatusOptions[0]}
							/>
							<FilterButton
								onFilterCancel={clearAllFilters}
								isFiltered={isFiltered}
							/> */}
						</Flex>
						{/* <InputRangePicker /> */}
						<Flex wrap gap={10} className="mt-3 xl:mt-0">
							<Button size="large" onClick={() => navigate(REGISTER_CONSULTOR)}>
								<Flex gap={5} align="center">
									<FaPlus />
									Cadastrar um consultor
								</Flex>
							</Button>
						</Flex>
					</Flex>
				</TableHeaderWrapper>

				{isLoading ? (
					<Skeleton />
				) : (
					<Table
						dataSource={filteredData}
						columns={columns}
						scroll={{ x: 300 }}
					/>
				)}
			</TableWrapper>

			<Modal
				open={open}
				onCancel={() => setOpen(false)}
				centered
				closable
				maskClosable
				footer={null}
			>
				<ModalNavigator data={currentConsultor} isReadonly={false} />
			</Modal>
		</>
	);
};

export default ConsultorsTable;
