//types
import { newProductDataType } from "../types/newProductForm.types";
import { newProductValidation } from "../types/newProductValidation";
//utils
import { validateInputNewProduct } from "./validateInputNewProduct";

export const validateFormDataProduct = (
  formData: newProductDataType
): { errors: newProductValidation; hasError: boolean } => {
  //create object of errors
  const errors: newProductValidation = {
    name: "",
    price: "",
    condition: "",
    description: "",
    city: "",
    imageFile: "",
  };
  //error flag
  let hasError = false;

  //check if every field is free of errors
  Object.entries(formData).forEach(([name, value]) => {
    //treat imageFile
    if (name === "imageFile") {
      if (value === null) {
        errors[name as keyof newProductValidation] =
          "No se ha seleccionado una imagen.";
        hasError = true; // Set hasError to true if there's an error
      }
    } else {
      const formattedValue =
        typeof value === "number" ? value.toString() : value;
      const dataError = validateInputNewProduct(name, formattedValue);
      if (name in errors) {
        errors[name as keyof newProductValidation] = dataError; // Assign the error
      }

      if (dataError) hasError = true;
    }
  });

  return { errors, hasError };
};
