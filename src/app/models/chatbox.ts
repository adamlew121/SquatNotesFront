import { Account } from './account';
import { Message } from './message';

export class ChatBox {
  id?: number;
  user: Account;
  title: string;
  date: Date;
  closed: boolean;
  messageList: Message[];
}
