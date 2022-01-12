import React, { createContext, useState } from "react";
import { User } from "../types/user.interface";

interface UserContextProps {
  loggedInUser: User | undefined;
  setLoggedInUser: (user: User | undefined) => void;
}

export const UserContext = createContext<UserContextProps>({
  loggedInUser: undefined,
  setLoggedInUser: () => {},
});

interface UserProviderProps {}

export const UserProvider: React.FC<UserProviderProps> = (props) => {
  const [loggedInUser, setLoggedInUser] = useState<User | undefined>();

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
