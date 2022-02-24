import { createContext } from "react";
import { User } from "../interfaces/auth";

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login(token: string, user: User): void;
  logout(): void;
}

const authContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export default authContext;
