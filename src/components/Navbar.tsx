import { Link } from "react-router-dom";
import logo from "../../public/logo.png";
import cartIcon from "../../public/bag-icon.png";
import NavbarCSS from "./Navbar.module.css";

const Navbar = () => {
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
            <span className={NavbarCSS.price}>$0.00</span>
            <span className={NavbarCSS.numOfItems}>0 items</span>
            <Link className={NavbarCSS.link} to="/cart">
              <img className={NavbarCSS.cartIcon} src={cartIcon} alt="Cart" />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
