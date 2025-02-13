//axios
import axios from "axios";
//types
import { userDatatype } from "../types/user.types";
//config
import { API_URL } from "../config";

export const fetchUserById = async (
  id: string
): Promise<userDatatype | null> => {
  try {
    const response = await axios.get<userDatatype>(API_URL + `/users/${id}`);
    return response.data;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};
