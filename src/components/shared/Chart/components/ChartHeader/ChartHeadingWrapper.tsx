import { ReactNode } from "react"


export const ChartHeadingWrapper = ({children}:{children:ReactNode}) => {
    
    return (

        <div className="flex gap-3 items-center">
  
            {children}

        </div>

    );
}