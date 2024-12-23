//*dummy data
//import { products } from "../assets/data";
//hooks
import { useEffect, useState } from "react";
//components
import ProductCard from "../components/UI/ProductCard";
//types
import { Product } from "../types/product.types";
//axios
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(API_URL + "/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  //rendering
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-2 mt-2 md:grid-cols-4">
        {products?.map((p) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </div>
    </>
  );
};

export default Home;
