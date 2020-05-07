import { Account } from './account';
import { ChatBox } from './chatbox';

export class Message {
  id?: number;
  messageDate: Date;
  text: string;
  sentByUser: boolean;
}
