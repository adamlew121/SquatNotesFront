import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../services/user.service';
import {Account} from '../models/account';
import {ImageService} from '../services/image.service';
import {ProgressService} from '../services/progress.service';
import {AppService} from '../services/app.service';

enum Exercise {
  BenchPress = 'Bench press',
  OHP = 'OHP',
  Squat = 'Squat',
  Deadlift = 'Deadlift'
}

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css'],
  providers: [ProgressService]
})
export class ProfileDetailsComponent implements OnInit {

  user: Account;
  idUser;
  imgSrc = 'assets/img/default_profile_photo.png';
  selectedExercise;

  benchPressIcon = this.appService.benchPressBlackIcon;
  ohpIcon = this.appService.ohpBlackIcon;
  squatIcon = this.appService.squatBlackIcon;
  deadliftIcon = this.appService.deadliftBlackIcon;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private imageService: ImageService,
              private progressService: ProgressService,
              private appService: AppService) {
    this.idUser = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(this.idUser).subscribe(user => {
      this.user = user;
      console.log(user);
    });
  }

  ngOnInit() {
    if (this.idUser) {
      this.loadPhoto(this.idUser);
    }
  }

  loadPhoto(idUser) {
    this.imageService.loadImage(idUser).subscribe(res => {
      if (res != null) {
        const imageFromDb = res;
        const reader = new FileReader();
        reader.onload = (e: any) => this.imgSrc = e.target.result;
        reader.readAsDataURL(imageFromDb);
      }
    });
  }

  selectExercise(nameExercise: string) {
    this.restartIcons();
    this.selectedExercise = nameExercise;
    this.changeIcon(nameExercise);
    this.progressService.getChartPoints(this.idUser, this.selectedExercise);
  }

  changeIcon(nameExercise: string) {
    switch (nameExercise) {
      case Exercise.BenchPress:
        if (this.benchPressIcon === this.appService.benchPressBlackIcon || this.selectedExercise === nameExercise) {
          this.benchPressIcon = this.appService.benchPressWhiteIcon;
        } else {
          this.benchPressIcon = this.appService.benchPressBlackIcon;
        }
        break;
      case Exercise.OHP:
        if (this.ohpIcon === this.appService.ohpBlackIcon || this.selectedExercise === nameExercise) {
          this.ohpIcon = this.appService.ohpWhiteIcon;
        } else {
          this.ohpIcon = this.appService.ohpBlackIcon;
        }
        break;
      case Exercise.Squat:
        if (this.squatIcon === this.appService.squatBlackIcon || this.selectedExercise === nameExercise) {
          this.squatIcon = this.appService.squatWhiteIcon;
        } else {
          this.squatIcon = this.appService.squatBlackIcon;
        }
        break;
      case Exercise.Deadlift:
        if (this.deadliftIcon === this.appService.deadliftBlackIcon || this.selectedExercise === nameExercise) {
          this.deadliftIcon = this.appService.deadliftWhiteIcon;
        } else {
          this.deadliftIcon = this.appService.deadliftBlackIcon;
        }
        break;
    }
  }

  restartIcons() {
    this.benchPressIcon = this.appService.benchPressBlackIcon;
    this.ohpIcon = this.appService.ohpBlackIcon;
    this.squatIcon = this.appService.squatBlackIcon;
    this.deadliftIcon = this.appService.deadliftBlackIcon;
  }
}
