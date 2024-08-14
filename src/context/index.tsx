import { ProviderProps } from "../@types/Provider/ProviderProps";
import { themeConfig } from "../theme/themeConfig";
import { CategoryFilterProvider } from "./CategoryFilterContext/CategoryFilterContext";
import { RangeDateProvider } from "./RangeDate/RangeDateContext";
import { ThemeProvider } from "./ThemeProvider";
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';

export const AppProvider = ({children}:ProviderProps) => {

    return (

        <ConfigProvider 
        locale={ptBR}
        theme={themeConfig}
        >
  
        <RangeDateProvider>

            <CategoryFilterProvider>

                    <ThemeProvider>

                            {children}

                    </ThemeProvider>

            </CategoryFilterProvider>
            
        </RangeDateProvider>

        </ConfigProvider>
        
    )

}