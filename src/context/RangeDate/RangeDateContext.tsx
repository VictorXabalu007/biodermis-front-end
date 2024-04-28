import {  createContext, useContext, useReducer } from "react";
import { ProviderProps } from "../../@types/Provider/ProviderProps";


export type RangeDateState = {
    rangeDate: [string,string];
}

type Action = {

    type:RangeDateActions,
    payload: any

}

type RefinedRangeDate = { startDate: string; endDate: string };

type ContextType = {

    state: RangeDateState,
    dispatch: (action: Action) => void
    refineRangeDate: (rangeDate:RangeDateState) => {startDate: string,endDate:string}

}

enum RangeDateActions {
    setRangeDate
}

const RangeDateContext = createContext<ContextType | undefined>(undefined);


const initialData = {
    rangeDate:  ['','']
}

const rangeDateReducer = (state:RangeDateState,action:Action)=> {

    switch(action.type){
        case RangeDateActions.setRangeDate:
            return {
                ...state,
                rangeDate: action.payload.rangeDate
            }
    }

}

const RangeDateProvider = ({children}:ProviderProps) => {

    const [state,dispatch] = useReducer(rangeDateReducer,initialData);

    const value = {state,dispatch,refineRangeDate};

    return <RangeDateContext.Provider value={value}>
            {children}
    </RangeDateContext.Provider>;

}

const refineRangeDate = (state: RangeDateState):RefinedRangeDate => {


        const [startDate,endDate] = state.rangeDate;
 
        
        return { startDate: startDate, endDate: endDate }; 


}


const useRangeDate = () => {
    const context = useContext(RangeDateContext)

    
    if(context===undefined) {
        throw new Error('useRangeDate precisa ser usado dentro do RangeDateProvider')
    }

    return context;
}

export {
    useRangeDate,
    RangeDateProvider,
    RangeDateActions
}