import { Link } from "react-router-dom";
import logo from "/logo.png";
import cartIcon from "/bag-icon.png";
import emptyCart from "/empty-cart.png";
import NavbarCSS from "./Navbar.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ProductType } from "../types";

const Navbar = () => {
  const cartItems = useSelector((state: RootState) => state.cartReducer.cart);

  const getTotal = (cartItems: ProductType[]) => {
    let totalPrice: number = 0;
    let totalQuantity: number = 0;

    cartItems.forEach((item) => {
      totalQuantity += item.quantity!;
      totalPrice += item.quantity! * item.price;
    });

    return { totalPrice, totalQuantity };
  };

  const [isCartVisible, setCartVisible] = useState<boolean>(false);
  const totalQuantity = getTotal(cartItems).totalQuantity;
  const totalPrice = getTotal(cartItems).totalPrice;

  const handleMouseEnter = () => {
    setCartVisible(true);
  };

  const handleMouseLeave = () => {
    setCartVisible(false);
  };

  return (
    <>
      <nav className={NavbarCSS.mainNav}>
        <div className={`container ${NavbarCSS.navItems}`}>
          <div className={NavbarCSS.logoHolder}>
            <Link className={NavbarCSS.link} to="/">
              <img className={NavbarCSS.logo} src={logo} alt="Logo" />
            </Link>
          </div>
          <div className={NavbarCSS.cartInfo}>
            <span className={NavbarCSS.price}>${totalPrice.toFixed(2)}</span>
            <span className={NavbarCSS.numOfItems}>
              {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
            </span>
            <Link
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={NavbarCSS.link}
              to="/cart"
            >
              <img className={NavbarCSS.cartIcon} src={cartIcon} alt="Cart" />
            </Link>
          </div>
        </div>
      </nav>
      {isCartVisible && (
        <div className={NavbarCSS.dropdownCart}>
          <div className={NavbarCSS.cartSummary}>
            <p>Your Cart:</p>
            <p>
              Total:{" "}
              <span className={NavbarCSS.totalPrice}>
                ${totalPrice.toFixed(2)}
              </span>
            </p>
          </div>
          <div className={NavbarCSS.cartProducts}>
            {cartItems.length > 0 ? (
              <div className={NavbarCSS.productList}>
                {cartItems.map((item) => {
                  return <div key={item.id} className={NavbarCSS.product}>
                  <p className={NavbarCSS.productName}>{item.name}</p>
                  <p className={NavbarCSS.priceAndQuantity}>{item.quantity} x {item.price}</p>
                </div>
                })}
                
              </div>
            ) : (
              <div className={NavbarCSS.emptyCart}>
                <img
                  className={NavbarCSS.emptyCartIcon}
                  src={emptyCart}
                  alt="Empty Cart"
                />
                <p className={NavbarCSS.emptyCartMsg}>Your cart is empty</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
