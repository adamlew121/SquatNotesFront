import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Exercise} from '../models/exercise';
import {Observable} from 'rxjs';
import {Muscle} from '../models/muscle';
import {Training} from '../models/training';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  URL = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {
  }

   getUserByLoginAndPassword(login: string, password: string): Observable<User> {
     const parameters = new HttpParams().set('login', login).set('password', password);
     return this.http.get<User>(this.URL + 'user', {params : parameters} );
   }

  // getTrainings(userId: number) {
  //   this.http.get()
  // }

  getExercises(): Observable<Array<Exercise>> {
    return this.http.get<Array<Exercise>>(this.URL + 'exercise');
  }

  getExercisesByTargetMuscle(muscleName: string): Observable<Array<Exercise>> {
    return this.http.get<Array<Exercise>>(this.URL + 'exercises/' + muscleName);
  }

  getTrainingsByUser(idUser: number): Observable<Array<Training>> {
    return this.http.get<Array<Training>>(this.URL + 'user/' + idUser + '/training');
  }
}
