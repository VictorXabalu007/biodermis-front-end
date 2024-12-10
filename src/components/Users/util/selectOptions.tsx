import { UserRole } from "../../../util/userRole";

export const userSelectOptions = [
	{
		value: 0,
		label: "Todos",
	},
	{
		value: -1,
		label: "Acessos",
	},
	{
		value: UserRole.ADMIN,
		label: "Admin",
	},
	{
		value: UserRole.CONSULTOR,
		label: "Consultor",
	},
	{
		value: UserRole.STOCK,
		label: "Estoque",
	},
	{
		value: UserRole.MANAGER,
		label: "Gerente",
	},
	{
		value: UserRole.USER,
		label: "Cliente",
	},
];
