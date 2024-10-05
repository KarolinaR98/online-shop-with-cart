import SingleProduct from "../types";
import Product from "./Product";
import styles from "./ProductList.module.css"

type ProductListProps = {
    products:  SingleProduct[];
}

const ProductList = (props: ProductListProps) => {
  return (
    <>
    <h2 className="heading">Products</h2>
      <div className={styles.productList}>
        {props.products.length ? props.products.map((product)=>{
            return <Product key={product.id} product={product}/>
        }) : null}
      </div>
    </>
  );
};

export default ProductList;
