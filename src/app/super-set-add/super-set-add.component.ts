import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {SuperSet} from '../models/super-set';
import {SingleSet} from '../models/single-set';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertService} from '../services/alert.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpService} from '../services/http.service';
import {Exercise} from '../models/exercise';
import {TrainingService} from '../services/training.service';

@Component({
  selector: 'app-super-set-add',
  templateUrl: './super-set-add.component.html',
  styleUrls: ['./super-set-add.component.css']
})
export class SuperSetAddComponent implements OnInit {

  @ViewChild('content', {static: false})
  element: TemplateRef<any>;
  modalReference: any;
  selectedExerciseName = 'Select Exercise';

  private exercises: Array<Exercise> = [];
  private superSets: Array<SuperSet> = [];
  private singleSets: Array<SingleSet> = [];

  private superSetsObs = new BehaviorSubject<Array<SuperSet>>([]);
  private singleSetsObs = new BehaviorSubject<Array<SingleSet>>([]);

  selectedExercise: Exercise;
  weight: number;
  reps: number;
  rpe: number;


  constructor(private modalService: NgbModal, private httpService: HttpService, private trainingService: TrainingService) {
    this.getSingleSetsObs().subscribe((sets: Array<SingleSet>) => this.singleSets = sets);
    this.singleSetsObs.next(this.singleSets);
    this.getSuperSetsObs().subscribe((sets: Array<SuperSet>) => this.superSets = sets);
    this.httpService.getExercises().subscribe(
      (exercises: Array<Exercise>) => this.exercises = exercises);
  }

  ngOnInit() {
  }

  addSet() {
    const singleSet: SingleSet = ({exercise: this.selectedExercise, weight: this.weight, reps: this.reps, rpe: this.rpe});

    const singleSets = this.singleSetsObs.getValue();
    singleSets.push(singleSet);
    this.singleSetsObs.next(singleSets);

    this.reset();
  }

  selectExercise(exercise: Exercise) {
    this.selectedExercise = exercise;
    this.selectedExerciseName = exercise.name;
  }

  saveSuperSet() {
    const superSet: SuperSet = ({sets: this.singleSets});

    if (superSet.sets.length > 0) {
      const superSets = this.superSetsObs.getValue();
      superSets.push(superSet);
      this.trainingService.setSuperSets(superSets);
      this.superSetsObs.next(superSets);

      this.singleSets = [];
      this.singleSetsObs.next(this.singleSets);
    }

    this.reset();
    this.close();
  }

  deleteSuperSet(index: number) {
    const superSets = this.superSetsObs.getValue();
    superSets.splice(index, 1);
    this.superSetsObs.next(superSets);
  }

  open(content) {
    console.log(this.exercises);
    this.modalReference = this.modalService.open(content);
  }

  close() {
    this.modalReference.close();
  }

  getSingleSetsObs(): Observable<Array<SingleSet>> {
    return this.singleSetsObs.asObservable();
  }

  getSuperSetsObs(): Observable<Array<SuperSet>> {
    return this.superSetsObs.asObservable();
  }

  getSuperSets(): Array<SuperSet> {
    return this.superSets;
  }


  reset() {
    this.weight = 0;
    this.reps = 0;
    this.rpe = 0;
  }

}
