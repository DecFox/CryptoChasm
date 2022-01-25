import { createContext, ReactElement, useState, useReducer } from 'react';
import {
  UserReducer,
  UserInterface,
  ActionInterface,
} from './reducers/UserReducer';

export interface GlobalUser {
  user: UserInterface;
  dispatch: (action: ActionInterface) => void;
}

export const UserContext = createContext<GlobalUser>({
  user: {
    walletAddress: '',
  },
  dispatch: () => {},
});

function UserContextProvider({ children }: { children: ReactElement }) {
  const [user, dispatch] = useReducer(UserReducer, { walletAddress: '' });
  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
