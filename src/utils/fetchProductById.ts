//axios
import axios from "axios";
//types
import { Product } from "../types/product.types";
//config
import { API_URL } from "../config";

export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    if (!response) {
      return null;
    }
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
