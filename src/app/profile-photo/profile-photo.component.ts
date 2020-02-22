import { Component, OnInit } from '@angular/core';
import {ImageService} from '../services/image.service';

@Component({
  selector: 'app-profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrls: ['./profile-photo.component.css']
})
export class ProfilePhotoComponent implements OnInit {
  selectedFile: any = null;
  imgSrc = 'assets/img/imgExample.jpg';
  imageFromDb: any = null;

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.loadPhoto(1);
  }

  onFileChanged(event) {
    const reader = new FileReader();
    reader.onload = (e: any) => this.imgSrc = e.target.result;
    reader.readAsDataURL(event.target.files[0]);
    this.selectedFile = event.target.files[0];
    this.imageService.uploadImage(1, this.selectedFile);
  }

  loadPhoto(idUser) {
    this.imageService.loadImage(idUser).subscribe(res => {
      this.imageFromDb = res;
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(this.imageFromDb);
    });
  }
}
