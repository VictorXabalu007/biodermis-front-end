

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HOME, REQUESTS } from "./constants/paths/paths";
import { HomeTemplate } from "./templates/Home";
import { RequestsTemplate } from "./templates/Requests";

export const AppRoutes = () => {


    return (

        <BrowserRouter>

            <Routes>

                <Route path={HOME} element={<HomeTemplate />} />
                <Route path={REQUESTS} element={<RequestsTemplate />} />

            </Routes>
            

        </BrowserRouter>

    )


}