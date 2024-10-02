import { ProductType } from "../types";
import Product from "./Product";
import ProductListCSS from "./ProductList.module.css"

type ProductListProps = {
    products:  ProductType[];
}

const ProductList = (props: ProductListProps) => {
  return (
    <>
      <div className={ProductListCSS.productList}>
        {props.products ? props.products.map((product)=>{
            return <Product key={product.id} name={product.name} price={product.price} url={product.url}/>
        }) : null}
      </div>
    </>
  );
};

export default ProductList;
