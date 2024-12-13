//types
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//types
import { Product } from "../../types/product.types";
//fa
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons/faLocationCrosshairs";
import { Link } from "react-router-dom";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <>
      <div className="p-2">
        <div className="w-full max-w-[300px] aspect-square overflow-hidden border border-gray-300 rounded-md">
          <Link to={`product/${product.id}`}>
            <img
              src={`/dummy/${product.image}`}
              className="w-full h-full object-cover object-center"
              alt="Product"
            />
          </Link>
        </div>
        <h3 className="text-sm truncate">{product.name}</h3>
        <p className="text-xl text-gray-500">Bs. {product.price}</p>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faLocationCrosshairs}
            size="xs"
            className="text-gray-500"
          />
          <p className="text-gray-500 text-sm">{product.city}</p>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
