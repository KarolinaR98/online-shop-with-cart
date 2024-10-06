import { Route, Routes } from "react-router-dom";
import Home from "../views/Home";
import Cart from "../views/Cart";
import ProductView from "../views/ProductView";

const AppRoutes = () => {

    return (
        <>
        <Routes>
            <Route path="/"  element={<Home/>}/>
            <Route path="/cart"  element={<Cart/>}/>
            <Route path="/cart/:id" element={<ProductView/>}/>
        </Routes>
        </>
    )
}

export default AppRoutes;