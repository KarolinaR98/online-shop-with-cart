import ProductList from "../components/ProductList";
import { products } from "../data";

const Home = () => {  

  return (
    <div className="container">
      <ProductList products={products} />
    </div>
  );
};

export default Home;
