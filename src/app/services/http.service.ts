import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Exercise} from '../models/exercise';
import {Observable} from 'rxjs';
import {Muscle} from '../models/muscle';
import {Training} from '../models/training';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  URL = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {
  }

  // getUserByLoginAndPassword(login: string, password: string) {
  //   this.http.get(this.URL + '')
  // }

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
