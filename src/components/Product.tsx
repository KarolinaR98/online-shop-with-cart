import { useDispatch } from "react-redux";
import SingleProduct from "../types";
import styles from "./Product.module.css";
import { addToCart } from "../store/slice/cartSlice";
import { Link } from "react-router-dom";

type ProductProps = {
  product: SingleProduct;
};

const Product = (props: ProductProps) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.productHolder}>
        <Link to={`/cart/${props.product.id}`}>
          <img className={styles.photo} src={props.product.url} alt={props.product.url} />
        </Link>
        <p className={styles.name}>{props.product.name}</p>
        <p className={styles.price}>${props.product.price}</p>
        <button
          onClick={() => dispatch(addToCart(props.product))}
          className={styles.btn}
        >
          Add to cart
        </button>
      </div>
    </>
  );
};

export default Product;
