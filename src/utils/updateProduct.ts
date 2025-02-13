//axios
import axios from "axios";
//types
import { newProductDataType } from "../types/newProductForm.types";
//config
import { API_URL } from "../config";
//utils
import { getTokenString } from "./getTokenString";

export const updateProduct = async (
  formData: newProductDataType,
  productId: string
) => {
  const { name, price, condition, description, city, imageFile } = formData;

  const tokenString = getTokenString();
  if (!tokenString) {
    return null; // Skip fetching if token is not valid
  }

  try {
    const response = await axios.put(
      `${API_URL}/products/${productId}`,
      {
        name,
        price,
        condition,
        description,
        city,
        imageFile,
      },
      {
        headers: {
          Authorization: `Bearer ${tokenString}`,
          "Content-Type": "multipart/form-data", // Specify the content type (because of Image File)
        },
      }
    );
    if (response.status === 201) {
      return;
    }
  } catch (error) {
    console.log(error);
  }
};
