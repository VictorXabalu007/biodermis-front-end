import { Requests } from "../../components/Requests";
import { useStateTheme } from "../../context/ThemeProvider";

export const RequestsTemplate = () => {
  const { setTitle } = useStateTheme();
  setTitle("Pedidos");
  return (

    <>
      <Requests.Cards />

      <Requests.Table />
    </>
    
  );
};
