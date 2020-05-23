import { UserService } from './../services/user.service';
import { MessageService } from './../services/message.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-support-chat',
  templateUrl: './support-chat.component.html',
  styleUrls: ['./support-chat.component.css']
})
export class SupportChatComponent implements OnInit {

  messageText = '';

  constructor(private messageService: MessageService, private userService: UserService) {
    if (this.messageService.selectedChatbox === undefined) {
      this.messageService.goBackToChatboxList();
    }
  }

  ngOnInit() {
  }

  doTextareaValueChange(ev) {
    try {
      this.messageText = ev.target.value;
    } catch (e) {}
  }

  clearTextarea() {
    this.messageText = '';
  }

}
