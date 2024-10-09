import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import styles from "./Footer.module.css";
import logo from "/logo.png";
import cartIcon from "/bag-icon.png";
import facebookIcon from "/facebook-icon.webp"
import instagramIcon from "/instagram-icon.png"
import youtubeIcon from "/youtube-icon.webp"
import { Link } from "react-router-dom";

const Footer = () => {
  const totalQuantity = useSelector(
    (state: RootState) => state.cart.totalQuantity
  );

  return (
    <>
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerBigDevices}>
            <img className={styles.logo} src={logo} alt="Logo" />
            <div className={styles.colsWrapper}>
                <div className={styles.col}>
                    <h3 className={styles.heading}>Company</h3>
                    <p>About us</p>
                    <p>Our Services</p>
                    <p>Privacy Policy</p>
                </div>
                <div className={styles.col}>
                    <h3 className={styles.heading}>Get Help</h3>
                    <p>FAQ</p>
                    <p>Shipping</p>
                    <p>Returns</p>
                    <p>Payment Options</p>
                </div>
                <div className={styles.col}>
                    <h3 className={styles.heading}>Follow Us</h3>
                    <div className={styles.iconsWrapper}>
                        <img className={styles.icon} src={facebookIcon} alt="Facebook" />
                        <img className={styles.icon} src={instagramIcon} alt="Instagram" />
                        <img className={styles.iconYT} src={youtubeIcon} alt="YouTube" />
                    </div>
                </div>
            </div>
          </div>
          <div className={styles.footerSmallDevices}>
            <Link to="/cart">
              <div className={styles.wrapper}>
                <img className={styles.cartIcon} src={cartIcon} alt="Cart" />
                <div className={styles.numOfItems}>{totalQuantity}</div>
              </div>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
