import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../services/alert.service';
import { MessageService } from '../services/message.service';
import { first, debounceTime } from 'rxjs/operators';
import { Message } from '../models/message';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-support-chat-add',
  templateUrl: './support-chat-add.component.html',
  styleUrls: ['./support-chat-add.component.css']
})
export class SupportChatAddComponent implements OnInit {

  @ViewChild('content', {static: false})
  element: TemplateRef<any>;
  modalReference: any;


  initialMessageText = '';
  addChatboxForm: FormGroup;
  loading = false;
  submitted = false;

  // tslint:disable-next-line: variable-name
  private _warning = new Subject<string>();
  warningMessage = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private httpService: HttpService, private modalService: NgbModal,
              private alertService: AlertService, private messageService: MessageService) { }

  ngOnInit() {
    this._warning.subscribe(message => this.warningMessage = message);
    this._warning.pipe(
      debounceTime(5000)
    ).subscribe(() => this.warningMessage = '');

    this.addChatboxForm = this.formBuilder.group({
    title: ['', Validators.required],
    user: [JSON.parse(localStorage.getItem('currentUser')), Validators.required],
    date: [new Date(), Validators.required],
    closed: [false],
    messageList: [[], Validators.required]
    });
  }

  get f() { return this.addChatboxForm.controls; }

  onSubmit() {
    if (localStorage.getItem('activeForm') === 'support-chat-add' || localStorage.getItem('activeForm') === null) {
      this.submitted = true;
      if (this.initialMessageText.length === 0) {
        this._warning.next('Initial message can\'t be empty');
        return;
      }
      this.f.messageList.setValue([this.getInitialMessage()]);
      console.log('title: ' + this.f.title.value);
      console.log('message: ' + this.initialMessageText);
      if (this.addChatboxForm.invalid) {
        return;
      }
      console.log(this.addChatboxForm.value);
      this.loading = true;
      this.httpService.createChatbox(this.addChatboxForm.value).pipe(first())
        .subscribe(
          data => {
            console.log(data);
            this.alertService.success('Chatbox created successfully', true);
            this.close();
            this.loading = false;
            this.messageService.loadChatboxList();
        },
        error => {
          console.log(error);
          this.alertService.error(error);
          this.loading = false;
        });
      this.messageService.loadChatboxList();
    }
  }

  open(content) {
    localStorage.setItem('activeForm', 'support-chat-add');
    this.modalReference = this.modalService.open(content, {size: 'lg'});
  }

  close() {
    localStorage.removeItem('activeForm');
    this.modalReference.close();
    }

  getInitialMessage() {
    const initialMessage: Message = ({messageDate: this.f.date.value, text: this.initialMessageText, sentByUser: true});
    return initialMessage;
  }

  doTextareaValueChange(ev) {
    try {
      this.initialMessageText = ev.target.value;
    } catch (e) {}
  }

}
