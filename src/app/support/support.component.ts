import { UserService } from './../services/user.service';
import { MessageService } from './../services/message.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  constructor(private messageService: MessageService, private userService: UserService) {
    this.messageService.loadChatboxList();
  }

  ngOnInit() {

  }

}
