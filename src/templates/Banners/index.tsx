
import BannersContainer from "../../components/Banners/banners";
import { useStateTheme } from "../../context/ThemeProvider"

export const BannersTemplate = () => {

    const {setTitle} = useStateTheme();
    setTitle('Banners')

    return (
  

        <BannersContainer />

    );
    
}