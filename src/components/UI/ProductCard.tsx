//types
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//types
import { Product } from "../../types/product.types";
//fa
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons/faLocationCrosshairs";
//rrd
import { Link } from "react-router-dom";
//config
import { IMAGE_STORAGE, IMAGE_URL } from "../../config";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <>
      <div className="p-2">
        <div className="w-full max-w-[400px] aspect-square overflow-hidden border border-gray-300 rounded-md md:max-w-[800px]">
          <Link to={`product/${product.id}`}>
            <img
              src={
                IMAGE_STORAGE === "local"
                  ? `${IMAGE_URL}/products/${product.image_name}`
                  : product.image_name
              }
              className="w-full h-full object-cover object-center"
              alt="Product"
            />
          </Link>
        </div>
        <div className="bg-gray-50">
          <h3 className="truncate custom-txt-sm">{product.name}</h3>
          <p className="custom-txt-md text-gray-500">Bs. {product.price}</p>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faLocationCrosshairs}
              size="xs"
              className="text-gray-500"
            />
            <p className="text-gray-500 custom-txt-sm">{product.city}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
