import { Request } from "../interfaces/request";
import { Chat } from "../interfaces/chat";

export interface ClientEvents {
  initUser: (userId: string) => void;
  request: (data: any, cb: (request: Request) => void) => void;
  accept: (id: string) => void;
  reject: (id: string) => void;
  leaveRoom: (id: string) => void;
  message: (data: Chat) => void;
  joinRoom: (id: string) => void;
  cancelRequest: (id: string) => void;
  removeFriend: (id: any) => void;
}

export interface ServerEvents {
  requestError: (error: string) => void;
  request: (request: Request) => void;
  accept: (requestId: string) => void;
  reject: (requestId: string) => void;
  message: (chat: Chat) => void;
  removeFriend: (id: string) => void;
  "message-notify": (chat: Chat) => void;
  "user-offline": (userId: string) => void;
  "user-online": (userId: string) => void;
}
