import { ChatBox } from './chatbox';
export class Account {

  id: number;
  name: string;
  email: string;
  surname: string;
  login: string;
  password: string;
  dateOfBirthday: Date;
  sex: string;
  profilePicture: any;
  advanced: number;
  type: number;
  chatboxList: ChatBox[];
}
