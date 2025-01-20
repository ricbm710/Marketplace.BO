//axios
import axios from "axios";
//types
import { LoginFormDataType } from "../types/loginForm.types";
//config
import { API_URL } from "../config";

export const login = async (formData: LoginFormDataType) => {
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
