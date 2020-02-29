import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Exercise} from '../models/exercise';
import {Observable} from 'rxjs';
import {Training} from '../models/training';
import {ChartPoint} from '../models/chart-point';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  URL = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {
  }

  getExercises(): Observable<Array<Exercise>> {
    return this.http.get<Array<Exercise>>(this.URL + 'exercise');
  }

  getExercisesByTargetMuscle(muscleName: string): Observable<Array<Exercise>> {
    return this.http.get<Array<Exercise>>(this.URL + 'exercises/' + muscleName);
  }

  getExercisesByUser(idUser: number): Observable<Array<Exercise>> {
    return this.http.get<Array<Exercise>>(this.URL + 'exercises/' + idUser);
  }

  getTrainingsByUser(idUser: number): Observable<Array<Training>> {
    return this.http.get<Array<Training>>(this.URL + 'user/' + idUser + '/training');
  }

  getChartPoints(idUser: number, exerciseName: string): Observable<Array<ChartPoint>> {
    return this.http.get<Array<ChartPoint>>(this.URL + 'user/' + idUser + '/progress?exerciseName=' + exerciseName);
  }

  getUserByLoginAndPassword(login: string, password: string): Observable<User> {
    return this.http.get<User>(this.URL + 'user?login=' + login + '&password=' + password);
  }
  postUser(dataObj): Observable<User> {
    return this.http.post<User>(this.URL + 'user', dataObj);
  }

  deleteTraining(idUser: number, training: Training) {
    console.log(this.URL + 'user/' + idUser + '/training');
    console.log({training});
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(this.URL + 'user/' + idUser + '/training', JSON.stringify(training), {headers} );
  }

  createTraining(dataObj, idUser: number): Observable<Training> {

    return this.http.post<Training>(this.URL + 'user/' + idUser + '/training', dataObj);
  }
}
