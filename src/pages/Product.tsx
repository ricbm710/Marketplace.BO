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
//config
import { API_URL, IMAGE_URL } from "../config";

const Product = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<ProductType>(
          `${API_URL}/products/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error: any) {
        const errorData = JSON.stringify(error.response.data.error);
        if (error.message === "Network Error") {
          setError("No se pudo conectar con la base de datos.");
        } else {
          setError(errorData.replace(/"/g, ""));
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  //rendering
  if (loading) {
    return <div className="p-1 md:p-2 custom-txt-sm">Cargando producto...</div>;
  }

  if (error) {
    return <div className="p-1 md:p-2 custom-txt-sm">{error}</div>;
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
          <h3 className="text-center font-semibold p-1 md:p-4 custom-txt-lg">
            {product?.name}
          </h3>
          <p className="text-center custom-txt-md md:p-1 mb-2">
            {product?.description}
          </p>
          <p className="text-center custom-txt-sm text-gray-500 md:p-1">
            <span className="font-semibold">Precio:</span> Bs. {product?.price}
          </p>
          <p className="text-center custom-txt-sm text-gray-500 md:p-1">
            <span className="font-semibold">Estado:</span>{" "}
            {product?.product_condition}
          </p>
          <p className="text-center custom-txt-sm text-gray-500 md:p-1">
            <span className="font-semibold">Ciudad:</span> {product?.city}
          </p>
          <p className="text-center custom-txt-sm text-gray-500 md:p-1">
            <span className="font-semibold">Vendedor:</span> {product?.user_id}
          </p>
          <div className="flex justify-center">
            <Link
              to={`https://wa.me/75577695?text=Me interesa el item ${product?.name} de Marketplace.BO`}
              className="custom-txt-md my-2 p-2 md:p-3 border border-white rounded-md bg-amber-800 text-white hover:bg-amber-950 transition-all"
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
