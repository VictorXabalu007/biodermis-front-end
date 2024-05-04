import { Layout } from "../Layout/Layout";
import { Content } from "../Layout/components/Content";
import { Header } from "../Layout/components/Header";
import { CardContainer } from "./components/CardContainer";
import { TableContainer } from "./components/TableContainer";
import { RequestFilterProvider } from "./context/FilterContext";



export const Requests = {

    Layout: Layout,
    Header: Header,
    Content: Content,
    Cards:CardContainer,
    Table: TableContainer,
    Provider: RequestFilterProvider
    
}