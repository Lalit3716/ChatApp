export interface User {
  _id: string;
  username: string;
  email: string;
  online: true | false;
  lastMessage?: string;
  lastMessageCreatedAt?: Date;
  unseen: number;
}
