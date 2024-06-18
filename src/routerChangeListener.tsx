import { useLocation } from "react-router-dom";
import { CategoryFilterActions, useCategoryFilter } from "./context/CategoryFilterContext/CategoryFilterContext";
import { useEffect } from "react";
import { PRODUCTS } from "./constants/paths/paths";



export const RouteChangeListener = () => {
    const location = useLocation();
    const { dispatch } = useCategoryFilter();
  
    useEffect(() => {

      if(location.pathname !== PRODUCTS){
          dispatch({
            type: CategoryFilterActions.setCategoriaId,
            payload: { categoria_id: null }
          });
      }
      
    }, [location, dispatch]);

    return (
        <>
        </>
    );
  
  
  };