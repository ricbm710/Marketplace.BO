//*dummy data
//import { products } from "../assets/data";
//hooks
import { useEffect, useState } from "react";
//rrd
import { Link, useParams } from "react-router-dom";
//types
import { Product as ProductType } from "../types/product.types";
//axios
import axios from "axios";

const Product = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<ProductType>(
          `${API_URL}/products/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch product");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const IMAGE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

  //rendering
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="p-2 flex flex-col md:flex-row md:p-4">
        <div className="w-full md:w-1/3 max-w-[800px] md:max-w-[800px] aspect-square overflow-hidden border border-gray-300 rounded-md ">
          <img
            src={`${IMAGE_URL}/products/${product?.image_name}`}
            className="w-full h-full object-cover object-center"
            alt="Product"
          />
        </div>
        <div className="flex flex-col align-center mx-auto">
          <h3 className="text-center font-semibold p-1 md:p-4 md:text-2xl">
            {product?.name}
          </h3>
          <p className="text-center text-sm md:text-xl md:p-1 mb-2">
            {product?.description}
          </p>
          <p className="text-center text-sm md:text-lg text-gray-500 md:p-1">
            <span className="font-semibold">Precio:</span> Bs. {product?.price}
          </p>
          <p className="text-center text-sm md:text-lg text-gray-500 md:p-1">
            <span className="font-semibold">Estado:</span>{" "}
            {product?.product_condition}
          </p>
          <p className="text-center text-sm md:text-lg text-gray-500 md:p-1">
            <span className="font-semibold">Ciudad:</span> {product?.city}
          </p>
          <p className="text-center text-sm md:text-lg text-gray-500 md:p-1">
            <span className="font-semibold">Vendedor:</span> {product?.user_id}
          </p>
          <div className="flex justify-center">
            <Link
              to="https://wa.me/75577695?text=hola"
              className="text-sm md:text-lg my-2 p-2 md:p-3 border border-gray-300 rounded-md bg-gray-800 text-white hover:bg-customBlue transition-all"
            >
              Contactar Vendedor
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
