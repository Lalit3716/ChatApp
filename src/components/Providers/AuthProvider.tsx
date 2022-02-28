import { FC, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import authContext from "../../contexts/authContext";
import { User } from "../../interfaces/auth";
import { ClientEvents, ServerEvents } from "../../socket/events";

const AuthProvider: FC = props => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(token ? true : false);
  const [user, setUser] = useState<User | null>(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null
  );

  const [socket, setSocket] = useState<Socket<
    ServerEvents,
    ClientEvents
  > | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      const newSocket = io(`${process.env.SERVER || "http://localhost:8000"}`);
      newSocket.emit("initUser", user!._id);
      setSocket(newSocket);
    }
  }, []);

  const login = (token: string, user: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
    setIsAuthenticated(true);

    setSocket(() => {
      const newSocket = io(`${process.env.SERVER || "http://localhost:8000"}`);
      newSocket.emit("initUser", user._id);
      return newSocket;
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
    setIsAuthenticated(false);

    socket?.disconnect();

    setSocket(null);
  };

  return (
    <authContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        socket,
        login,
        logout,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthProvider;
