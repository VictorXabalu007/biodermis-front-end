import { useEffect } from "react";
import UsersTable from "../../components/Users/users-table";
import { useStateTheme } from "../../context/ThemeProvider";

export const UsersTemplate = () => {
  const { setTitle } = useStateTheme();
  useEffect(() => {
    setTitle("Usuários");
  }, [setTitle]);

  return <UsersTable />;
};
