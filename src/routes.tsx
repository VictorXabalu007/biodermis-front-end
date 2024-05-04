

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CONSULTORS, HOME, INVOICING, PRODUCTS, REQUESTS, USERS, WITHDRAWAL } from "./constants/paths/paths";
import { HomeTemplate } from "./templates/Home";
import { RequestsTemplate } from "./templates/Requests";
import { ConsultorsTemplate } from "./templates/Consultors";
import { UsersTemplate } from "./templates/Users";
import { ProductsTemplate } from "./templates/Products";
import { WithdrawalRequestsTemplate } from "./templates/WithdrawalRequests";
import { InvoicingTemplate } from "./templates/Invoicing";

export const AppRoutes = () => {


    return (

        <BrowserRouter>

            <Routes>

                <Route path={HOME} element={<HomeTemplate />} />
                <Route path={REQUESTS} element={<RequestsTemplate />} />
                <Route path={CONSULTORS} element={<ConsultorsTemplate />} />
                <Route path={USERS} element={<UsersTemplate />} />
                <Route path={PRODUCTS} element={<ProductsTemplate />} />
                <Route path={WITHDRAWAL} element={<WithdrawalRequestsTemplate />} />
                <Route path={INVOICING} element={<InvoicingTemplate />} />

            </Routes>
            

        </BrowserRouter>

    )


}