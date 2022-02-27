import { createContext } from "react";
import { Socket } from "socket.io-client";
import { User } from "../interfaces/auth";
import { ClientEvents, ServerEvents } from "../socket/events";

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login(token: string, user: User): void;
  logout(): void;
  socket: Socket<ServerEvents, ClientEvents> | null;
}

const authContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  token: null,
  socket: null,
  login: () => {},
  logout: () => {},
});

export default authContext;
