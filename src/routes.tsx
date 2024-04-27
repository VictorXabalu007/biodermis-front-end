

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HOME } from "./constants/paths/paths";
import { HomeTemplate } from "./templates/Home";

export const AppRoutes = () => {


    return (

        <BrowserRouter>

            <Routes>

                <Route path={HOME} element={<HomeTemplate />} />


            </Routes>
            

        </BrowserRouter>

    )


}