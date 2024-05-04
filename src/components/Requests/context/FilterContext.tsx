import { createContext, useContext, useReducer } from "react";
import { ProviderProps } from "../../../@types/Provider/ProviderProps";




export type RequestFilterState = {


    searchRequest: string;
    latestDays: string;
    requests: string;
    status: string;
    sellChannel: string;

}

type Action = {

    type:RequestFilterActions,
    payload: any

}

type ContextType = {

    state: RequestFilterState,
    dispatch: (action:Action) => void,

}

const RequestFilterContext = createContext<ContextType | undefined>(undefined);

const initialData:RequestFilterState  = {

    searchRequest: '',
    latestDays: 'last90Days',
    requests: 'requestsCurrent',
    status: 'statusAll',
    sellChannel: 'sellChannelAll'

}

enum RequestFilterActions {

    setSearchRequest,
    setLatestDays,
    setRequest,
    setStatus,
    setSellChannel

}

const filterReducer = (state:RequestFilterState, action: Action) => {


    switch(action.type) {
        case RequestFilterActions.setSearchRequest:
            return {
                ...state,
                searchRequest: action.payload.searchRequest
            }
        case RequestFilterActions.setLatestDays:
            return {
                ...state,
                latestDays: action.payload.latestDays
            }
        case RequestFilterActions.setRequest:
            return {
                ...state,
                requests: action.payload.requests
            }
        case RequestFilterActions.setStatus:
            return {
                ...state,
                status: action.payload.status
            }
        case RequestFilterActions.setSellChannel:
            return {
                ...state,
                sellChannel: action.payload.sellChannel
            }
    }


}

const RequestFilterProvider = ({children}:ProviderProps) => {

    const [state,dispatch] = useReducer(filterReducer, initialData);

    const value = {state,dispatch};

    return (
        <RequestFilterContext.Provider value={value}>

            {children}

        </RequestFilterContext.Provider>
    )


}

const useRequestFilter = () => {

    const context= useContext(RequestFilterContext);

    if(context===undefined) {
        throw new Error('useRequestFilter precisa ser usado dentro do RequestFilterContext')
    }

    return context;

}


export {RequestFilterActions, RequestFilterProvider, useRequestFilter}



