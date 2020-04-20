import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-profile-list-filter',
  templateUrl: './profile-list-filter.component.html',
  styleUrls: ['./profile-list-filter.component.css']
})
export class ProfileListFilterComponent implements OnInit {

  filters = this.formBuilder.group({
    search: [''],
    genderOptionMale: [true],
    genderOptionFemale: [true],
    sortBy: ['']
  });

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  handleFilter() {
    console.log(this.filters);
    this.userService.filter(this.filters);
  }

}
