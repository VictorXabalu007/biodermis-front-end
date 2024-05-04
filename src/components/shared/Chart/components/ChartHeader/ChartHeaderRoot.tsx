import { ReactNode } from "react";


export const ChartHeaderRoot = ({children}:{children:ReactNode}) => {


    return (

        <div className="flex justify-between w-full mb-10 p-3">
            {children}
        </div>
        
    );
}