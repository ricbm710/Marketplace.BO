//axios
import axios from "axios";
//types
import { userDatatype } from "../types/user.types";
//utils
import { getTokenString } from "./getTokenString";
//config
import { API_URL } from "../config";

//*this function helps set the User Context (once the login is successful) by returning the user details
//*It can detect if an user is logged in at the start of the app

export const fetchUserDetails = async (
  setExpired: React.Dispatch<React.SetStateAction<boolean>>
): Promise<userDatatype | null> => {
  const tokenString = getTokenString();
  if (!tokenString) {
    return null; // Skip fetching if token is not valid
  }

  try {
    const response = await axios.get<userDatatype>(API_URL + "/users/details", {
      headers: {
        Authorization: `Bearer ${tokenString}`,
      },
    });
    return response.data;
  } catch (error: any) {
    const errorResponse = JSON.parse(error.request.response);
    if (errorResponse.error === "Token has expired") {
      setExpired(true); // Update expired state in the context
    }
    return null;
  }
};
