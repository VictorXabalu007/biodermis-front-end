import { ProviderProps } from "../@types/Provider/ProviderProps";
import { RangeDateProvider } from "./RangeDate/RangeDateContext";



export const AppProvider = ({children}:ProviderProps) => {

    return (
        <RangeDateProvider>
            {children}
        </RangeDateProvider>
    )

}