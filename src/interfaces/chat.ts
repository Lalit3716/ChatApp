export interface Chat {
  message: string;
  sender: string;
  receiver: string;
  createdAt: Date;
  seen: boolean;
}
