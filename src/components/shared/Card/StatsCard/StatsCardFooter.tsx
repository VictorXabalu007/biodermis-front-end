import { ReactNode } from "react";



export const StatsCardFooter = ({children}:{children:ReactNode}) => {
    return (
            <div className="flex w-full py-2 justify-between">

                {children}

            </div>

    );
}