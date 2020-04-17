import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {ImageService} from '../services/image.service';
import {User} from '../models/user';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit {

  constructor(private userService: UserService, private imageService: ImageService, private router: Router) {
    this.userService.loadUserList();
  }

  ngOnInit() {
  }

  getProfilePhoto(user: User) {
    if (!user.profilePicture) {
      user.profilePicture = 'assets/img/default_profile_photo.png';
      this.imageService.loadImage(user.id).subscribe(res => {
        const reader = new FileReader();
        if (res != null) {
          reader.onload = (e: any) => user.profilePicture = e.target.result;
          reader.readAsDataURL(res);
        }
      });
    }
    return true;
  }
}
