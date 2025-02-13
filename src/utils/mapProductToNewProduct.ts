import { newProductDataType } from "../types/newProductForm.types";
import { Product } from "../types/product.types";

export function mapProductToNewProduct(product: Product): newProductDataType {
  return {
    name: product.name,
    price: product.price,
    condition: product.product_condition, // Renaming the field
    description: product.description,
    city: product.city,
    imageFile: null, // Placeholder, as converting `image_name` to `File` requires fetching the file separately
  };
}
