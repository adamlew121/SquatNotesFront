import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';
import {TagContentType} from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  URL = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  uploadImage(idUser: number, image: File) {
    console.log('ImageService.uploadImage');
    const fd = new FormData();
    fd.append('image', image, image.name);
    this.http.put(this.URL + 'user/' + idUser + '/profile-photo', fd)
      .subscribe(res => {
        console.log(res);
      });
  }

  loadImage(idUser: number): Observable<any> {
    console.log('service.loadImage');
    return this.http.get(this.URL + 'user/' + idUser + '/profile-photo',
      {
        headers: {'Content-Type': 'image/jpg'},
        responseType: 'blob'
      });
  }
}
