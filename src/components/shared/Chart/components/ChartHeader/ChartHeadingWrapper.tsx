import { ReactNode } from "react"


export const ChartHeadingWrapper = ({children}:{children:ReactNode}) => {
    
    return (

        <div className="flex gap-2 items-center">
  
            {children}

        </div>

    );
}