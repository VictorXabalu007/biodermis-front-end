import { ReactNode } from "react";



export const StatsCardFooter = ({children}:{children:ReactNode}) => {
    return (
            <div className="flex justify-between">

                {children}

            </div>

    );
}