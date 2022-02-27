import { User } from "./auth";

export interface Request {
  _id: string;
  sender: User;
  receiver: User;
}
