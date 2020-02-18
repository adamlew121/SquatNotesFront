import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  URL = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  uploadImage(idUser: number, image: Blob) {
    console.log('ImageService.uploadImage');
    this.http.put(this.URL + 'user' + idUser + '/profile-photo/', image);
  }
}
