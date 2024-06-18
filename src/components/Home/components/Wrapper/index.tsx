import { ReactNode, useEffect } from "react";
import { useCategoriesData } from "../../../Categories/hooks/useCategoriesData";
import { CATEGORIES } from "../../../../constants/SessionStorageKeys/sessionStorageKeys";



export const HomeWrapper = ({children}:{children:ReactNode}) => {

    const {data:categories} = useCategoriesData();

    useEffect(()=> {
        if(categories) {
            sessionStorage.setItem(CATEGORIES, JSON.stringify(categories))
        }
    },[categories])

    return (
        <div className="flex w-full flex-col lg:flex-row gap-5">
            {children}
        </div>
    )
}