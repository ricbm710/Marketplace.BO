import { createContext, useContext, useState, ReactNode } from "react";
//types
import { userDatatype } from "../types/user.types";

// Define the shape of the context
interface UserContextType {
  user: userDatatype | null;
  setUser: (user: userDatatype | null) => void;
  loginContext: (userData: userDatatype) => void;
  logoutContext: () => void;
}

// Create the context
const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loginContext: () => {},
  logoutContext: () => {},
});

// Custom hook for accessing the context
export const useUser = () => useContext(UserContext);

// Context provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<userDatatype | null>(null);

  const loginContext = (userData: userDatatype) => {
    setUser(userData);
  };

  const logoutContext = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, loginContext, logoutContext }}
    >
      {children}
    </UserContext.Provider>
  );
};
