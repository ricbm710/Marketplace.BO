//axios
import axios from "axios";
//types
import { LoginFormDataType } from "../types/loginForm.types";

export const login = async (formData: LoginFormDataType) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { email, password } = formData;
  try {
    const response = await axios.post(
      API_URL + "/auth/login",
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    //returns the jwt
    return response.data;
  } catch (error) {
    throw new Error("Login failed");
  }
};
