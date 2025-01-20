//axios
import axios from "axios";
//types
import { RegisterFormDataType } from "../types/registerForm.types";
//config
import { API_URL } from "../config";

export const register = async (
  formData: RegisterFormDataType
): Promise<void> => {
  const { email, name, phone, password } = formData;
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      email,
      name,
      phone,
      password,
    });
    if (response.status === 201) {
      return;
    }
  } catch (error: unknown) {
    console.error(error);
    // Narrow down the error type
    if (error instanceof Error) {
      throw new Error(error.message); // Now `error.message` is safe to access
    } else {
      throw new Error("An unknown error occurred during registration.");
    }
  }
};
