import { PropsWithChildren, createContext, useContext, useReducer } from "react"



export type CategoryFilterState = {
    categoria_id: number | null
    default_index: number
    options: {value:any,label:any}[]
}

type Action = {

    type:CategoryFilterActions,
    payload: any

}

enum CategoryFilterActions {
    setCategoriaId,
    setDefaultIndex,
    setOptions
}


type ContextType = {

    state: CategoryFilterState,
    dispatch: (action: Action) => void

}

const CategoryFilterContext = createContext<ContextType | undefined>(undefined);

const initialData:CategoryFilterState = {
    categoria_id: null,
    default_index: 0,
    options: []
}

const categoryFilterReducer = (state:CategoryFilterState,action:Action)=> {

    switch(action.type){
        case CategoryFilterActions.setCategoriaId:
            return {
                ...state,
                categoria_id: action.payload.categoria_id
            }
        case CategoryFilterActions.setDefaultIndex:
            return {
                ...state,
                default_index: action.payload.default_index
            }
        case CategoryFilterActions.setOptions:
            return {
                ...state,
                options: action.payload.options
            }

        default: {
            return {...state}
        }
    }

}

const CategoryFilterProvider = ({children}:PropsWithChildren) => {

    const [state,dispatch] = useReducer(categoryFilterReducer,initialData);

    const value = {state,dispatch};

    return <CategoryFilterContext.Provider value={value}>
            {children}
    </CategoryFilterContext.Provider>;

}

const useCategoryFilter = () => {

    const context = useContext(CategoryFilterContext)
    
    if(context===undefined) {
        throw new Error('useCategoryFilter precisa ser usado dentro do CategoryFilterContext')
    }

    return context;
}

export {
    useCategoryFilter,
    CategoryFilterProvider,
    CategoryFilterActions
}