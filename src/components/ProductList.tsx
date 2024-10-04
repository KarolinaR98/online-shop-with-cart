import { ProductType } from "../types";
import Product from "./Product";
import ProductListCSS from "./ProductList.module.css"

type ProductListProps = {
    products:  ProductType[];
}

const ProductList = (props: ProductListProps) => {
  return (
    <>
    <h2 className="heading">Products</h2>
      <div className={ProductListCSS.productList}>
        {props.products ? props.products.map((product)=>{
            return <Product key={product.id} product={product}/>
        }) : null}
      </div>
    </>
  );
};

export default ProductList;
