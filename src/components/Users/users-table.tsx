import { TableWrapper } from "../shared/Table/table-wrapper.tsx";
import { useUsersData } from "../../hooks/users/useUsersData.tsx";
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
import { TableHeaderWrapper } from "../shared/Table/table-header-wrapper.tsx";
import { REGISTER_CONSULTOR } from "../../constants/paths.ts";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Select from "../shared/Input/select.tsx";
import { userSelectOptions } from "./util/selectOptions.tsx";
import { buildStatus } from "../../functions/buildStatus.tsx";
import { userImageFallback } from "../../util/projectImage.ts";
import { IoMdClose } from "react-icons/io";
import { colors } from "../../theme/colors.ts";
import { ModalNavigator } from "../shared/Modal/modal-navigator.tsx";
import { useTableActions } from "../../hooks/useTableActions.tsx";
import { useEffect, useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { getUserRole, UserRole } from "../../util/userRole.ts";
import FilterButton from "../shared/Button/filter-button.tsx";
import DowloadButton from "../shared/Button/download-button.tsx";
import { downloadCertified } from "../../functions/download-certified.ts";
import SearchInput from "../shared/Input/search-input.tsx";
import { urlParams } from "../../util/urlParams.ts";
import { normalizeText } from "../../functions/normalize-text.ts";
import FilterButtons from "./util/button-filter.tsx";

const UsersTable = () => {
	const [searchValue, setSearchValue] = useState("");
	const [activeFilters, setActiveFilters] = useState<number[]>([0]);
	const [selectOptions, setSelectOptions] = useState(userSelectOptions);
	const { users, setUsers, isLoading } = useUsersData();

	const { users: initialData } = useUsersData();

	useEffect(() => {
		if (users) {
			setFilteredData(users);
		}
	}, [users]);

	const {
		getColumnSearchProps,
		filteredData,
		setFilteredData,
		clearAllFilters,
		isFiltered,
	} = useTableActions({
		data: users,
		setData: setUsers,
	});

	const navigate = useNavigate();

	const { confirm } = Modal;

	const showFormModal = ({
		readOnly,
		data,
	}: { readOnly: boolean; data: UserCredentials }) => {
		confirm({
			content: <ModalNavigator data={data} isReadonly={readOnly} />,

			okButtonProps: { className: "hidden" },
			cancelButtonProps: { className: "hidden" },
			maskClosable: true,
			closable: true,
			centered: true,
			closeIcon: <IoMdClose color={colors.primaryPurple} />,
			width: 500,
			icon: null,
		});
	};

	const handleEditClick = (data: UserCredentials) => {
		showFormModal({ readOnly: false, data });
	};

	const handleUserRoleChange = (userRoles: number[]) => {
		setActiveFilters(userRoles);
		console.log(userRoles, UserRole.USER)
		if (userRoles.includes(-1)) {
			setSelectOptions(
				userSelectOptions.filter(
					(option) =>
						option.value === UserRole.ADMIN ||
						option.value === UserRole.MANAGER ||
						option.value === UserRole.STOCK ||
						option.value === UserRole.CONSULTOR ||
						option.value === UserRole.USER,
				),
			);
		} else if (userRoles.includes(UserRole.USER) || userRoles.includes(UserRole.CONSULTOR)) {
			setSelectOptions(
				userSelectOptions.filter(
					(option) =>
						option.value === UserRole.CONSULTOR ||
						option.value === UserRole.USER,
				),
			);
		} else {
			setSelectOptions(
				userSelectOptions.filter(
					(option) =>
						option.value === UserRole.ADMIN ||
						option.value === UserRole.MANAGER ||
						option.value === UserRole.STOCK,
				),
			);
		}

		onFilter(searchValue, userRoles);
	};

	const columns: TableColumnsType<UserCredentials> = [
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
			...getColumnSearchProps("nome", "Nome"),
			sorter: (a, b) => a.nome.localeCompare(b.nome),
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
			...getColumnSearchProps("email", "Email"),
		},
		{
			title: "Telefone",
			dataIndex: "telefone",
			key: "telefone",
			...getColumnSearchProps("telefone", "Telefone"),
			sorter: (a, b) => a.nome.localeCompare(b.nome),
		},
		{
			title: "Tipo",
			dataIndex: "cargo_id",
			key: "cargo_id",
			render: (value) => getUserRole(value),
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
				<Flex gap={10} align="center">
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
						<>
							<DowloadButton
								title="Baixar certificado"
								onClick={() => downloadCertified(record.srccert)}
								outlined={false}
							/>
						</>
					)}
				</Flex>
			),
		},
	];

	const onFilter = (value: string, filters: number[]) => {
		const normalizedValue = normalizeText(value);

		const filtered = initialData.filter((user) => {
			const matchesSearch =
				normalizeText(user.nome || "").includes(normalizedValue) ||
				normalizeText(user.email || "").includes(normalizedValue) ||
				normalizeText(user.telefone || "").includes(normalizedValue);

			const matchesFilter =
				filters.includes(0) || filters.includes(user.cargo_id);

			return matchesSearch && matchesFilter;
		});

		setFilteredData(filtered);
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = normalizeText(e.target.value || "");
		setSearchValue(e.target.value);
		urlParams.set("search", value);
		navigate({
			pathname: window.location.pathname,
			search: `${urlParams.toString()}`,
		});

		onFilter(value, activeFilters);
	};

	const filteredSelectOptions = selectOptions.filter(
		(option) => option.label !== "Acessos",
	);

	useEffect(() => {
		const search = urlParams.get("search");
		if (search) {
			setSearchValue(search);
			onFilter(search, activeFilters);
		}
	}, [users]);

	useEffect(() => {
		setSelectOptions(userSelectOptions);
	}, []);
	console.log({ filteredSelectOptions, selectOptions })
	return (
		<TableWrapper>
			<TableHeaderWrapper heading="Lista de usuários">
				<FilterButtons
					options={userSelectOptions}
					onFilterChange={handleUserRoleChange}
				/>
				<Flex wrap justify="space-between" align="center">
					<Flex align="center" gap={10} className="md:flex-nowrap flex-wrap">
						<SearchInput
							value={searchValue}
							placeholder="Pesquisar por nome, email, telefone"
							onChange={handleSearch}
						/>

						<Select
							options={filteredSelectOptions}
							onChange={(selectedRole) => handleUserRoleChange([selectedRole])}
							defaultValue={filteredSelectOptions[0].value}
						/>

						<FilterButton
							isFiltered={isFiltered}
							onFilterCancel={clearAllFilters}
						/>
					</Flex>

					<Flex wrap gap={10} className="mt-3 xl:mt-0">
						<Button size="large" onClick={() => navigate(REGISTER_CONSULTOR)}>
							<Flex gap={5} align="center">
								<FaPlus />
								Cadastrar um usuário
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
	);
};

export default UsersTable;
