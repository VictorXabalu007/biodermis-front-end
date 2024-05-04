import { useState } from "react";
import { RequestFilterActions, useRequestFilter } from "../../../../../context/FilterContext";




export const useSearchValue = () => {
    const [searchValue ,setSearchValue] = useState('');
    const {dispatch} = useRequestFilter();

    
    const handleSearchValue = (e:React.FocusEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        dispatch({
            type: RequestFilterActions.setSearchRequest,
            payload: {searchRequest: e.target.value}
        })
    }

    return {
        searchValue,
        handleSearchValue
    }
}