import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
//types
import { userDatatype } from "../types/user.types";
//utils
import { fetchUserDetails } from "../utils/fetchUserDetails";

// Define the shape of the context
interface UserContextType {
  user: userDatatype | null;
  setUser: (user: userDatatype | null) => void;
  loginContext: (userData: userDatatype) => void;
  logoutContext: () => void;
  expired: boolean;
  setExpired: (expired: boolean) => void;
}

// Create the context
const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loginContext: () => {},
  logoutContext: () => {},
  expired: false,
  setExpired: () => {},
});

// Custom hook for accessing the context
export const useUser = () => useContext(UserContext);

// Context provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<userDatatype | null>(null);
  const [expired, setExpired] = useState<boolean>(false);

  const loginContext = (userData: userDatatype) => {
    setUser(userData);
    setExpired(false);
  };

  const logoutContext = () => {
    setUser(null);
    setExpired(false);
  };

  useEffect(() => {
    const fetchAndSetUser = async () => {
      const userDetails = await fetchUserDetails(setExpired);
      setUser(userDetails);
    };
    fetchAndSetUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loginContext,
        logoutContext,
        expired,
        setExpired,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
