import ProductCSS from "./Product.module.css"

type ProductProps = {
    name: string,
    price: number,
    url: string
}

const Product = (props: ProductProps) => {

    return(
        <>
            <div className={ProductCSS.productHolder}>
                <img className={ProductCSS.photo} src={props.url} alt="Product" />
                <p className={ProductCSS.name}>{props.name}</p>
                <p className={ProductCSS.price}>${props.price}</p>
                <button className={ProductCSS.btn}>Add to cart</button>
            </div>
        </>
    )
}

export default Product;