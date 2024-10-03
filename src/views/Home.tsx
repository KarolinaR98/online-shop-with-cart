import ProductList from "../components/ProductList";
import { ProductType } from "../types";

const Home = () => {
  const products: ProductType[] = [
    {
      id: 1,
      name: "Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation.",
      price: 99.99,
      category: "Electronics",
      url: "/wireless_headphones.jpg",
    },
    {
      id: 2,
      name: "Smartphone",
      description: "Latest model smartphone with 128GB storage.",
      price: 599.99,
      category: "Electronics",
      url: "/smartphone.jpg",
    },
    {
      id: 3,
      name: "Running Shoes",
      description:
        "Comfortable and lightweight running shoes for all terrains.",
      price: 79.99,
      category: "Sportswear",
      url: "/running_shoes.jpg",
    },
    {
      id: 4,
      name: "Backpack",
      description: "Durable and spacious backpack with multiple compartments.",
      price: 49.99,
      category: "Accessories",
      url: "/backpack.jpg",
    },
    {
      id: 5,
      name: "Smartwatch",
      description: "Water-resistant smartwatch with health tracking features.",
      price: 199.99,
      category: "Electronics",
      url: "/smartwatch.jpg",
    },
    {
      id: 6,
      name: "Bluetooth Speaker",
      description: "Portable Bluetooth speaker with excellent sound quality.",
      price: 39.99,
      category: "Electronics",
      url: "/bluetooth_speaker.jpg",
    },
    {
      id: 7,
      name: "Yoga Mat",
      description: "Eco-friendly yoga mat with non-slip surface.",
      price: 29.99,
      category: "Fitness",
      url: "/yoga_mat.jpg",
    },
    {
      id: 8,
      name: "Laptop",
      description:
        "Lightweight laptop with a powerful processor and long battery life.",
      price: 899.99,
      category: "Electronics",
      url: "/laptop.jpg",
    },
    {
      id: 9,
      name: "Sunglasses",
      description: "Stylish sunglasses with UV protection.",
      price: 19.99,
      category: "Accessories",
      url: "/sunglasses.jpg",
    },
    {
      id: 10,
      name: "Gaming Chair",
      description:
        "Ergonomic gaming chair with adjustable armrests and lumbar support.",
      price: 149.99,
      category: "Furniture",
      url: "/gaming_chair.jpg",
    },
  ];

  return (
    <>
      <div className="container">
        <ProductList products={products}/>
      </div>
    </>
  );
};

export default Home;
