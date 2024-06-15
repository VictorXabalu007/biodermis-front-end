import { CATEGORIES } from "../../../constants/SessionStorageKeys/sessionStorageKeys";
import { CategoryType } from "../../Categories/service/getCategory";


const categories:CategoryType[] = JSON.parse(sessionStorage.getItem(CATEGORIES) ??'[]');
    
export const categoryOptions = categories.map(c => ({
    value: c.id,
    label: c.categoria
}))