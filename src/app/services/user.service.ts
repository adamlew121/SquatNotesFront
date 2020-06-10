import {Injectable} from '@angular/core';
import {Account} from '../models/account';
import {HttpService} from './http.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {FormGroup} from '@angular/forms';

enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

enum SortOption {
  nameASC = 'nameASC',
  nameDESC = 'nameDESC',
  advDown = 'advDown',
  advUp = 'advUp'
}

enum Advanced {
  NOVICE = 'Novice',
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
  EXPERT = 'Expert'
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userList: Array<Account> = [];
  private filteredUserList: Array<Account> = [];
  private filteredUserListObs = new BehaviorSubject<Array<Account>>(this.filteredUserList);

  constructor(private httpService: HttpService) {
  }

  getUser(idUser): Observable<Account> {
    return this.httpService.getUserById(idUser);
  }

  loadUserList() {
    this.httpService.getUsers().subscribe(users => {
      this.userList = users;
      this.filteredUserList = users;
      this.filteredUserListObs.next(this.filteredUserList);
    });
  }

  filter(filters: FormGroup) {
    this.filteredUserList = this.userList;
    if ((filters.value.genderOptionMale !== filters.value.genderOptionFemale) ||
      (!filters.value.genderOptionMale && !filters.value.genderOptionFemale)) {
      if (!filters.value.genderOptionMale) {
        this.filteredUserList = this.filterByGender(this.filteredUserList, Gender.MALE);
      }
      if (!filters.value.genderOptionFemale) {
        this.filteredUserList = this.filterByGender(this.filteredUserList, Gender.FEMALE);
      }
    }
    if (filters.value.search) {
      this.filteredUserList = this.filterByContainWord(this.filteredUserList, filters.value.search);
    }
    if (filters.value.sortBy) {
      this.filteredUserList = this.sortByOption(this.filteredUserList, filters.value.sortBy);
    }
    this.filteredUserListObs.next(this.filteredUserList);
  }

  getUserList(): Observable<Array<Account>> {
    return this.filteredUserListObs.asObservable();
  }

  filterByGender(userList: Array<Account>, gender: Gender) {
    return userList.filter(user => user.sex !== gender.toString());
  }

  filterByContainWord(userList: Array<Account>, word: string) {
    return userList.filter(user => {
      user.name = user.name.toUpperCase();
      word = word.toUpperCase();
      return (user.name.includes(word) || user.surname.includes(word) || user.login.includes(word));
    });
  }

  sortByOption(userList: Array<Account>, option: SortOption) {
    switch (option) {
      case SortOption.nameASC:
        return this.sortBySurnameASC(userList);
      case SortOption.nameDESC:
        return this.sortBySurnameDESC(userList);
      case SortOption.advDown:
        return this.sortByAdvancedDown(userList);
      case SortOption.advUp:
        return this.sortByAdvancedUp(userList);
      default:
        return;
    }
  }

  sortBySurnameASC(userList: Array<Account>) {
    return userList.sort((n1, n2) => {
      if (n1.surname > n2.surname) {
        return 1;
      }

      if (n1.surname < n2.surname) {
        return -1;
      }

      return 0;
    });
  }

  sortBySurnameDESC(userList: Array<Account>) {
    return userList.sort((n1, n2) => {
      if (n1.surname > n2.surname) {
        return -1;
      }

      if (n1.surname < n2.surname) {
        return 1;
      }

      return 0;
    });
  }

  sortByAdvancedDown(userList: Array<Account>) {
    return userList.sort((n1, n2) => {
      if (n1.advanced > n2.advanced) {
        return -1;
      }

      if (n1.advanced < n2.advanced) {
        return 1;
      }
      return 0;
    });
  }

  sortByAdvancedUp(userList: Array<Account>) {
    return userList.sort((n1, n2) => {
      if (n1.advanced < n2.advanced) {
        return -1;
      }

      if (n1.advanced > n2.advanced) {
        return 1;
      }
      return 0;
    });
  }

  isSupport() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user.type === 1) {
      return true;
    } else {
      return false;
    }
  }

  getAdvanced(advanced: number) {
    if (advanced > 800) {
      return Advanced.EXPERT;
    } else if (advanced > 600) {
      return Advanced.ADVANCED;
    } else if (advanced > 400) {
      return Advanced.INTERMEDIATE;
    } else if (advanced > 100) {
      return Advanced.BEGINNER;
    } else {
      return Advanced.NOVICE;
    }
  }
}


