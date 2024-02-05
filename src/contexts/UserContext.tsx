import { createContext } from 'react';

export type User = {
  username: string;
  id: number
}

export type UserContextType = {
  user: User | null;
  setUser: (user: User) => void
}

export const UserContext = createContext<UserContextType>({user: null, setUser: () => {}});
