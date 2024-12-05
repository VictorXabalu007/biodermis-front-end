import UsersTable from "../../components/Users/users-table";
import { useStateTheme } from "../../context/ThemeProvider";

export const UsersTemplate = () => {
	const { setTitle } = useStateTheme();
	setTitle("Usuários");

	return <UsersTable />;
};
