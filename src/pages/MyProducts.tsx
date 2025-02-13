import { useEffect, useState } from "react";
//types
import { Product } from "../types/product.types";
//config
import { API_URL } from "../config";
//axios
import axios from "axios";
//utils
import { getTokenString } from "../utils/getTokenString";
//components
import MyProductCard from "../components/UI/MyProductCard";

const MyProducts = () => {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    const tokenString = getTokenString();
    if (!tokenString) {
      return; // Skip fetching if token is not valid
    }
    const fetchProducts = async () => {
      const response = await axios.get(`${API_URL}/my-products`, {
        headers: {
          Authorization: `Bearer ${tokenString}`,
        },
      });
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="font-semibold text-center custom-txt-lg md:mb-2 mt-2">
        Mis Productos
      </h2>
      {products?.map((prod) => (
        <MyProductCard product={prod} key={prod.id} />
      ))}
    </div>
  );
};

export default MyProducts;
