import { createContext } from "react";
import { User } from "../interfaces/auth";
import { Request } from "../interfaces/request";

interface Props {
  friends: User[];
  requests: Request[];
  sendRequestTo: (user: User) => void;
  acceptRequest: (request: Request) => void;
  rejectRequest: (request: Request) => void;
}

export const friendsContext = createContext<Props>({
  friends: [],
  requests: [],
  sendRequestTo: () => {},
  acceptRequest: () => {},
  rejectRequest: () => {},
});
