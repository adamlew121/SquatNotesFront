import {Component, Input, OnInit} from '@angular/core';
import {SuperSet} from '../models/super-set';

@Component({
  selector: 'app-super-set',
  templateUrl: './super-set.component.html',
  styleUrls: ['./super-set.component.css']
})
export class SuperSetComponent implements OnInit {

  @Input()
  superSet: SuperSet;

  @Input()
  class: string;

  constructor() { }

  ngOnInit() {
  }

}
