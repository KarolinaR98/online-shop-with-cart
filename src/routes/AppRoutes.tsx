import { Route, Routes } from "react-router-dom";
import Home from "../views/Home";
import Cart from "../views/Cart";

const AppRoutes = () => {

    return (
        <>
        <Routes>
            <Route path="/"  element={<Home/>}/>
            <Route path="/cart"  element={<Cart/>}/>
        </Routes>
        </>
    )
}

export default AppRoutes;