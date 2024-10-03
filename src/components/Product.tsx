import { useDispatch } from "react-redux";
import { ProductType } from "../types";
import ProductCSS from "./Product.module.css"
import { addToCart } from "../store/slice/cartSlice";

type ProductProps = {
    product: ProductType; 
}

const Product = (props: ProductProps) => {

    const dispatch = useDispatch();

    const onAddToCart = (product: ProductType) => {
        dispatch(addToCart(product));
    }

    return(
        <>
            <div className={ProductCSS.productHolder}>
                <img className={ProductCSS.photo} src={props.product.url} alt="Product" />
                <p className={ProductCSS.name}>{props.product.name}</p>
                <p className={ProductCSS.price}>${props.product.price}</p>
                <button onClick={() => {onAddToCart(props.product)}} className={ProductCSS.btn}>Add to cart</button>
            </div>
        </>
    )
}

export default Product;