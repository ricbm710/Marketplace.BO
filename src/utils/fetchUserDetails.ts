//axios
import axios from "axios";
//types
import { userDatatype } from "../types/user.types";
//utils
import { getTokenString } from "./getTokenString";

//*this function helps set the User Context once the login is successful by returning the user details

export const fetchUserDetails = async (): Promise<userDatatype | null> => {
  const API_URL = import.meta.env.VITE_API_URL;
  //get token string
  const tokenString = getTokenString();

  if (!tokenString) {
    console.warn("Token is missing or invalid. Aborting fetch.");
    return null; // Skip fetching if token is not valid
  }

  try {
    const response = await axios.get<userDatatype>(API_URL + "/users/details", {
      headers: {
        Authorization: `Bearer ${tokenString}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to set user context:", error);
    return null;
  }
};
