import { ProviderProps } from "../@types/Provider/ProviderProps";
import { CategoryFilterProvider } from "./CategoryFilterContext/CategoryFilterContext";
import { RangeDateProvider } from "./RangeDate/RangeDateContext";



export const AppProvider = ({children}:ProviderProps) => {

    return (
        <RangeDateProvider>
            <CategoryFilterProvider>

                    {children}

            </CategoryFilterProvider>
        </RangeDateProvider>
    )

}