import { useLocation } from "react-router-dom";



export const useURLParams = () => {

    return new URLSearchParams(useLocation().search);
    
}