import { useParams } from "react-router-dom";
import styles from "./ProductView.module.css";
import { products } from "../data";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slice/cartSlice";
import SingleProduct from "../types";

const ProductView = () => {
  const params = useParams();

  const dispatch = useDispatch();

  const product = products.find((product) => product.id === Number(params.id));

  return (
    <div className="container vh100">
      <p className={styles.path}>
        {product?.category} &gt; {product?.name}
      </p>
      <div className={styles.productHolder}>
        <div className={styles.imageHolder}>
          <img className={styles.image} src={product?.url} alt="Product" />
        </div>
        <div className={styles.productDetails}>
          <h2 className={styles.name}>{product?.name}</h2>
          <p className={styles.price}>${product?.price}</p>
          <p className={styles.description}>{product?.description}</p>
          <button onClick={() => dispatch(addToCart(product as SingleProduct))} className={styles.btn}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
