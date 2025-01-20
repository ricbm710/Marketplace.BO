//jwt-decode
//import { jwtDecode } from "jwt-decode";

export const getTokenString = (): string | null => {
  const authTokenString = localStorage.getItem("authToken");

  if (!authTokenString) {
    //console.warn("No auth token found in localStorage.");
    return null;
  }

  try {
    const authToken = JSON.parse(authTokenString);

    if (authToken && typeof authToken.token === "string") {
      return authToken.token;
    }

    console.warn("Auth token is not in the expected format.");
    return null;
  } catch (error) {
    console.error("Couldn't parse the auth token:", error);
    return null;
  }
};
