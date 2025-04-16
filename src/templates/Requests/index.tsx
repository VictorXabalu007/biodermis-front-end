
import RequestCardContainer from "../../components/Requests/request-cards";
import RequestsTable from "../../components/Requests/request-table";
import { useStateTheme } from "../../context/ThemeProvider";

export const RequestsTemplate = () => {
  const { setTitle } = useStateTheme();
  setTitle("Pedidos");
  return (

    <>
      <RequestsTable>
        <RequestCardContainer />
      </RequestsTable>
    </>

  );
};
