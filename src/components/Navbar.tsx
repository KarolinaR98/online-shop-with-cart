import { Link } from "react-router-dom";
import logo from "../../public/logo.png";
import cartIcon from "../../public/bag-icon.png";
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <nav className="main-nav">
        <div className="container nav-items">
          <div className="nav-logo-holder">
            <Link className="nav-link" to="/">
              <img className="nav-logo" src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="nav-cart-info">
            <span className="nav-price">$0.00</span>
            <span className="nav-num-of-items">0 items</span>
            <Link className="nav-link" to="/cart">
              <img className="nav-cart-icon" src={cartIcon} alt="Cart" />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
