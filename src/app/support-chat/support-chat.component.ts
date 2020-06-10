import { UserService } from './../services/user.service';
import { MessageService } from './../services/message.service';
import {AfterContentInit, Component, OnInit} from '@angular/core';
import {AppService} from '../services/app.service';

@Component({
  selector: 'app-support-chat',
  templateUrl: './support-chat.component.html',
  styleUrls: ['./support-chat.component.css']
})
export class SupportChatComponent implements OnInit, AfterContentInit {

  messageText = '';

  constructor(private messageService: MessageService, private userService: UserService, private appService: AppService) {
    if (this.messageService.selectedChatbox === undefined) {
      this.messageService.goBackToChatboxList();
    }
  }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    // this.appService.scroll(document.getElementById('textBox'));
  }

  doTextareaValueChange(ev) {
    try {
      this.messageText = ev.target.value;
    } catch (e) {}
  }

  clearTextarea() {
    this.messageText = '';
  }

  addMessage() {
    this.messageService.addMessageToChatbox(this.messageText);
    this.clearTextarea();
  }
}
