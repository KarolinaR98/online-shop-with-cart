import ProductList from "../components/ProductList";
import { products } from "../data.ts";

const Home = () => {  

  return (
    <div className="container">
      <ProductList products={products} />
    </div>
  );
};

export default Home;
