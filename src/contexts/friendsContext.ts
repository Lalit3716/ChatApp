import { createContext } from "react";
import { User } from "../interfaces/auth";
import { Request } from "../interfaces/request";

interface Props {
  friends: User[];
  requests: Request[];
  sendRequestTo: (user: User) => void;
  acceptRequest: (request: Request) => void;
  rejectRequest: (request: Request) => void;
  cancelRequest: (request: Request) => void;
  removeFriend: (user: User) => void;
  updateLastMessage: (id: string, message: string) => void;
  markAsSeen: (id: string) => void;
}

export const friendsContext = createContext<Props>({
  friends: [],
  requests: [],
  sendRequestTo: () => {},
  acceptRequest: () => {},
  rejectRequest: () => {},
  cancelRequest: () => {},
  removeFriend: () => {},
  updateLastMessage: () => {},
  markAsSeen: () => {},
});
