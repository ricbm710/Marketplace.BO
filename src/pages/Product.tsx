//*dummy data
import { products } from "../assets/data";
//hooks
import { useEffect, useState } from "react";
//rrd
import { useParams } from "react-router-dom";
//types
import { Product as ProductType } from "../types/product.types";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    const fetchedProduct = products.find((p) => p.id === Number(id));
    setProduct(fetchedProduct || null);
  }, [id]);

  return <div>{product?.name}</div>;
};

export default Product;
