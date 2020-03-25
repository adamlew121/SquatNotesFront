import { ExerciseService } from './../services/exercise.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Options } from 'ng5-slider';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../services/alert.service';
import { TrainingService } from '../services/training.service';
import { first } from 'rxjs/operators';
import { Muscle } from '../models/muscle';

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



  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private httpService: HttpService,
              private exerciseService: ExerciseService,
              private modalService: NgbModal,
              private alertService: AlertService,
              private trainingService: TrainingService) { }

  ngOnInit() {
    this.addExerciseForm = this.formBuilder.group({
      name: ['', Validators.required],
      user: [JSON.parse(localStorage.getItem('currentUser')), Validators.required],
      targetMuscles: [this.targetMuscles, Validators.required]
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
    this.submitted = true;
    this.f.targetMuscles.setValue(this.targetMuscles);
    if (this.addExerciseForm.invalid) {
      console.log('niepoprawny form exercise-add');
      return;
    }

    this.loading = true;
    console.log(this.addExerciseForm.value);
    this.httpService.createExercise(this.addExerciseForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Exercise created successfull', true);
          this.close();
          this.exerciseService.refreshExerciseList();
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  open(content) {
    this.targetMuscles = [];
    this.modalReference = this.modalService.open(content, {size: 'lg'});
  }

  close() {
    this.modalReference.close();
  }

  formatLabel(value: number) {
    if (value >= 10) {
      return Math.round(value / 10) + 'k';
    }

    return value;
  }

}
