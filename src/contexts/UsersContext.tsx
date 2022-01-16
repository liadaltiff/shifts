import React, { createContext, useState } from "react";
import { User } from "../types/user.interface";

interface UsersContextProps {
  stateUsers: User[];
  setStateUsers: (users: User[]) => void;
}

export const UsersContext = createContext<UsersContextProps>({
  stateUsers: [],
  setStateUsers: () => {},
});

interface UsersProviderProps {}

export const UsersProvider: React.FC<UsersProviderProps> = (props) => {
  const [stateUsers, setStateUsers] = useState<User[]>([]);

  return (
    <UsersContext.Provider value={{ stateUsers, setStateUsers }}>
      {props.children}
    </UsersContext.Provider>
  );
};
