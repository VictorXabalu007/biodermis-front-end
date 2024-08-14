import { ProviderProps } from "../@types/Provider/ProviderProps";
import { CategoryFilterProvider } from "./CategoryFilterContext/CategoryFilterContext";
import { RangeDateProvider } from "./RangeDate/RangeDateContext";
import { ThemeProvider } from "./ThemeProvider";



export const AppProvider = ({children}:ProviderProps) => {

    return (

        <RangeDateProvider>

            <CategoryFilterProvider>

                    <ThemeProvider>

                            {children}

                    </ThemeProvider>

            </CategoryFilterProvider>
            
        </RangeDateProvider>
        
    )

}