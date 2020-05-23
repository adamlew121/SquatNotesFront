import { Account } from './../models/account';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Exercise} from '../models/exercise';
import {Observable} from 'rxjs';
import {Training} from '../models/training';
import {ChartPoint} from '../models/chart-point';
import { Muscle } from '../models/muscle';
import { Message } from '../models/message';
import { ChatBox } from '../models/chatbox';
import {map} from 'rxjs/operators';

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
    return this.http.get<Array<Exercise>>(this.URL + 'exercises/user/' + idUser);
  }

  getDefaultExercises(): Observable<Array<Exercise>> {
    return this.http.get<Array<Exercise>>(this.URL + 'exercises/default');
  }

  getMuscles(): Observable<Array<Muscle>> {
    return this.http.get<Array<Muscle>>(this.URL + 'muscle');
  }

  getTrainingsByUser(idUser: number): Observable<Array<Training>> {
    return this.http.get<Array<Training>>(this.URL + 'user/' + idUser + '/training');
  }

  getChatboxList(): Observable<Array<ChatBox>> {
    return this.http.get<Array<ChatBox>>(this.URL + 'chatbox/all');
  }

  getChatboxListByUser(idUser: number): Observable<Array<ChatBox>> {
    return this.http.get<Array<ChatBox>>(this.URL + 'chatbox/' + idUser);
  }

  getChartPoints(idUser: number, exerciseName: string): Observable<Array<ChartPoint>> {
    return this.http.get<Array<ChartPoint>>(this.URL + 'user/' + idUser + '/progress?exerciseName=' + exerciseName);
  }

  getUserByLoginAndPassword(login: string, password: string): Observable<Account> {
    return this.http.get<Account>(this.URL + 'user?login=' + login + '&password=' + password);
  }

  getUserById(idUser: number): Observable<Account> {
    return this.http.get<Account>(this.URL + 'user/' + idUser);
  }

  getUsers(): Observable<Array<Account>> {
    return this.http.get<Array<Account>>(this.URL + 'users');
  }

  postUser(dataObj): Observable<Account> {
    return this.http.post<Account>(this.URL + 'user', dataObj);
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

  createExercise(dataObj): Observable<Exercise> {
    return this.http.post<Exercise>(this.URL + 'exercise', dataObj);
  }

  createChatbox(dataObj): Observable<ChatBox> {
    return this.http.post<ChatBox>(this.URL + 'chatbox', dataObj);
  }

  updateChatbox(dataObj): Observable<ChatBox> {
    return this.http.patch<ChatBox>(this.URL + 'chatbox', dataObj);
  }


}
