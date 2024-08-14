import { Layout } from "../Layout/Layout";
import { Content } from "../Layout/components/Content";
import { Header } from "../Layout/components/Header";

import ProductEditor from "./components/product-editor";
import { ProductsTable } from "./components/product-table";


export const Products = {

    Layout: Layout,
    Header: Header,
    Content: Content,
    Table: ProductsTable,
    Editor:ProductEditor

}