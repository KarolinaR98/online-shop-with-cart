import { Link, useParams } from "react-router-dom";
import styles from "./ProductView.module.css";
import { products } from "../data.ts";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slice/cartSlice";
import { useState } from "react";
import ImageMagnifier from "../components/ImageMagnifier";

const ProductView = () => {
  const params = useParams();
  const [amount, setAmount] = useState<string>("1");

  const dispatch = useDispatch();

  const product = products.find((product) => product.id === Number(params.id));

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.trim();
    const parsedValue = Number(value);

    if (!value || isNaN(parsedValue)) {
      setAmount("1");
    } else if (parsedValue < 1) {
      setAmount("1");
    } else if (parsedValue > 99) {
      setAmount("99");
    } else {
      setAmount(e.target.value);
    }
  };

  return (
    <div className="container vh100">
      <p className={styles.path}>
      <Link className={styles.link} to={"/"}>Home</Link> &gt; {product?.category} &gt; {product?.name}
      </p>
      <div className={styles.productHolder}>
        <div className={styles.imageHolder}>
          {product && <ImageMagnifier imageUrl={product.url}/>}
        </div>
        <div className={styles.productDetails}>
          <h2 className={styles.name}>{product?.name}</h2>
          <p className={styles.price}>${product?.price}</p>
          <p className={styles.description}>{product?.description}</p>
          <div>
            <input
              className={styles.setAmount}
              type="number"
              value={amount}
              onChange={(e) => {
                if (!product) return;
                setAmount(e.target.value);
              }}
              onBlur={(e) => handleBlur(e)}
            />
            <button
              onClick={() => {
                if (!product) return;
                dispatch(
                  addToCart({ product: product, quantity: Number(amount) })
                );
              }}
              className={styles.btn}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
