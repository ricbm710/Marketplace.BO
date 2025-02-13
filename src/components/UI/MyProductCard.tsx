import { useEffect, useState } from "react";
//fa
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//config
import { IMAGE_STORAGE, IMAGE_URL } from "../../config";
//types
import { Product } from "../../types/product.types";
//utils
import { truncateText } from "../../utils/truncateText";
//rrd
import { Link } from "react-router-dom";

interface MyProductCardProps {
  product: Product;
}

const MyProductCard = ({ product }: MyProductCardProps) => {
  const [wordLimit, setWordLimit] = useState<number>(8);

  useEffect(() => {
    const handleResize = () => {
      setWordLimit(window.innerWidth >= 768 ? 36 : 7);
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-row items-start w-[375px] md:w-[750px] gap-2 md:gap-4 m-2 custom-txt-sm border border-gray-400 p-1 md:p-3 rounded-md">
      <div className="flex flex-col justify-center items-center w-[90px] md:w-[220px]">
        <div className="w-full max-w-[75px] md:max-w-[200px] aspect-square overflow-hidden border border-gray-700">
          <img
            src={
              IMAGE_STORAGE === "local"
                ? `${IMAGE_URL}/products/${product.image_name}`
                : product.image_name
            }
            className="w-full h-full object-cover object-center"
            alt="Product"
          />
        </div>
        <p className="custom-txt-xs">Bs. {product.price}</p>
      </div>
      <div className="flex flex-col w-full justify-between">
        <div className="flex flex-col h-[75px] md:h-[150px]">
          <p className="truncate w-full font-semibold">{product.name}</p>
          <p className="text-gray-500">{product.product_condition}</p>
          <p className="custom-txt-xs">
            {truncateText(product.description, wordLimit)}
          </p>
        </div>
        <div className="flex ms-auto">
          <Link
            to={`edit/${product.id}`}
            className="border-2 border-gray-500 px-2 py-1 mt-1 ms-auto flex flex-row gap-1 items-baseline bg-amber-400"
          >
            <FontAwesomeIcon icon={faEdit} size="sm" />
            <p className="custom-txt-xs">Editar</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyProductCard;
