import { UserService } from './user.service';
import { ChatBox } from '../models/chatbox';
import { Account } from './../models/account';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from '../models/message';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  selectedChatbox: ChatBox;
  chatBoxList: Array<ChatBox>;
  loading = false;

  constructor(private httpService: HttpService, private router: Router, private userService: UserService) {}

  loadChatboxList() {
    console.log('getUserChatBox');
    if (JSON.parse(localStorage.getItem('currentUser')).type === 1) {
      this.httpService.getChatboxList().subscribe((chatBoxList: Array<ChatBox>) => {
        if (chatBoxList) {
          console.log('chatboxList => ' + chatBoxList);
          this.chatBoxList = chatBoxList;
        } else {
          console.log('nie znalazlo dobrych chatBoxów');
        }
      });
    } else {
      this.httpService.getChatboxListByUser(JSON.parse(localStorage.getItem('currentUser')).id).subscribe((chatBoxList: Array<ChatBox>) => {
        if (chatBoxList) {
          console.log('chatboxList => ' + chatBoxList);
          this.chatBoxList = chatBoxList;
        } else {
          console.log('nie znalazlo dobrych chatBoxów');
        }
      });
    }
  }

  getChatboxList() {
    return this.sortByDateDESC(this.chatBoxList);
  }

  selectChatbox(chatBox: ChatBox) {
    console.log(chatBox);
    this.selectedChatbox = chatBox;
    this.router.navigate(['/support-chat']);
  }

  getSelectedChatbox() {
    return this.selectedChatbox;
  }

  goBackToChatboxList() {
    this.router.navigate(['/support']);
  }

  sortByDateDESC(chatBoxList: Array<ChatBox>) {
    return chatBoxList.sort((n1, n2) => {
      if (n1.date > n2.date) {
        return -1;
      }

      if (n1.date < n2.date) {
        return 1;
      }

      return 0;
    });
  }

  changeChatboxStatus() {
    this.selectedChatbox.closed = !(this.selectedChatbox.closed);
    this.httpService.updateChatbox(this.selectedChatbox).subscribe((chatbox: ChatBox) => {
      if (chatbox) {
        console.log('chatbox status has been changed');
        this.loadChatboxList();
        this.selectChatbox(chatbox);
      } else {
        console.log('error during changing chatbox status');
      }
    });
  }

  addMessageToChatbox(messageText: string) {
    this.loading = true;
    if (messageText.length > 0) {
      const isUser = !this.userService.isSupport();

      console.log('isUser: ' + isUser);
      const message: Message = ({ messageDate: new Date(), text: messageText, sentByUser: isUser});
      this.selectedChatbox.messageList.push(message);

      this.httpService.updateChatbox(this.selectedChatbox).subscribe((chatbox: ChatBox) => {
        if (chatbox) {
          console.log('chatbox message has been added');
          this.loadChatboxList();
          this.selectChatbox(chatbox);
          this.loading = false;
        } else {
          console.log('error during adding chatbox message');
          this.loading = false;
        }
      });
    }

  }


}

