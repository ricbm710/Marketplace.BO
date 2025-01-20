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
//config
import { API_URL } from "../config";

const Home = () => {
  //*loads all products
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(API_URL + "/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error: any) {
        if (error.message === "Network Error") {
          setError("No se pudo conectar con la base de datos.");
        } else {
          const errorData = JSON.stringify(error.response.data.error);
          setError(errorData.replace(/"/g, ""));
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  //rendering
  if (loading) {
    return (
      <div className="p-1 md:p-2 custom-txt-sm">
        <p>Cargando Productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-1 md:p-2 custom-txt-sm">
        <p>{error}</p>
      </div>
    );
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
