import { ExerciseService } from './../services/exercise.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Options } from 'ng5-slider';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../services/alert.service';
import { TrainingService } from '../services/training.service';
import { first, debounceTime } from 'rxjs/operators';
import { Muscle } from '../models/muscle';
import { Subject } from 'rxjs';
import { Exercise } from '../models/exercise';


@Component({
  selector: 'app-exercise-add',
  templateUrl: './exercise-add.component.html',
  styleUrls: ['./exercise-add.component.css']
})
export class ExerciseAddComponent implements OnInit {

  @ViewChild('content', {static: false})
  element: TemplateRef<any>;
  modalReference: any;

  addExerciseForm: FormGroup;
  loading = false;
  submitted = false;

  targetMuscles: Array<Muscle> = [];

  private _warning = new Subject<string>();
  warningMessage = '';




  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private httpService: HttpService,
              private exerciseService: ExerciseService,
              private modalService: NgbModal,
              private alertService: AlertService,
              private trainingService: TrainingService) { }

  ngOnInit() {
    this._warning.subscribe(message => this.warningMessage = message);
    this._warning.pipe(
      debounceTime(5000)
    ).subscribe(() => this.warningMessage = '');

    this.addExerciseForm = this.formBuilder.group({
      name: ['', Validators.required],
      user: [JSON.parse(localStorage.getItem('currentUser')), Validators.required],
      targetMuscles: [this.targetMuscles]
    });
  }

  checkboxChange(muscle: Muscle) {
    const result = this.targetMuscles.filter(obj => obj !== muscle);
    if (result.length === this.targetMuscles.length) {
      console.log(muscle.name + ' added');
      this.targetMuscles.push(muscle);
    } else {
      console.log(muscle.name + ' removed');
      this.targetMuscles = result;
    }
  }

  get f() { return this.addExerciseForm.controls; }

  onSubmit() {
    if (localStorage.getItem('activeForm') === 'exercise-add' || localStorage.getItem('activeForm') === null) {
      this.submitted = true;
      this.f.targetMuscles.setValue(this.targetMuscles);
      if (this.addExerciseForm.invalid) {
        console.log('niepoprawny form exercise-add');
        return;
      }
      // customowe walidatory
      console.log('1');
      if (this.targetMuscles.length === 0) {
        this._warning.next('Choose at least one muscle');
        return;
      } else {
        const exercises = this.exerciseService.getExerciseList();
        console.log(exercises);
        for (let i = 0, len = exercises.length; i < len; i++) {
          console.log('3');
          console.log(exercises[i].name);
          if (exercises[i].name === this.f.name.value) {
            this._warning.next('Exercise\'s name is already used');
            return;
          }
        }
      }
      console.log('4');

      this.loading = true;
      console.log(this.addExerciseForm.value);
      this.httpService.createExercise(this.addExerciseForm.value)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success('Exercise created successfull', true);
            this.close();
            this.exerciseService.refreshExerciseList();
            this.loading = false;
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
      }
    }

  open(content) {
    localStorage.setItem('activeForm', 'exercise-add');
    this.targetMuscles = [];
    this.modalReference = this.modalService.open(content, {size: 'lg'});
  }

  close() {
    this.modalReference.close();
    localStorage.removeItem('activeForm');
  }

  formatLabel(value: number) {
    if (value >= 10) {
      return Math.round(value / 10) + 'k';
    }

    return value;
  }

}
