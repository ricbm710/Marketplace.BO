//types
import { newProductDataType } from "../types/newProductForm.types";

export const areObjectsEqual = (
  obj1: newProductDataType,
  obj2: newProductDataType
): boolean => {
  return (
    obj1.name === obj2.name &&
    Number(obj1.price) === Number(obj2.price) &&
    obj1.condition === obj2.condition &&
    obj1.description === obj2.description &&
    obj1.city === obj2.city &&
    obj1.imageFile === obj2.imageFile // Ensures both reference the same File object
  );
};
