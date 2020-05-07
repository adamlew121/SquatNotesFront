import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpService} from '../services/http.service';
import {first} from 'rxjs/operators';
import {AlertService} from '../services/alert.service';
import { Options } from 'ng5-slider';
import {TrainingService} from '../services/training.service';

@Component({
  selector: 'app-training-add',
  templateUrl: './training-add.component.html',
  styleUrls: ['./training-add.component.css']
})
export class TrainingAddComponent implements OnInit {

  @ViewChild('content', {static: false})
  element: TemplateRef<any>;
  modalReference: any;

  addTrainingForm: FormGroup;
  loading = false;
  submitted = false;

  difficulty = 5;
  sliderOptions: Options = {
    floor: 0,
    ceil: 10,
    step: 1,
    showTicks: true,
    showTicksValues: true
  };

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private httpService: HttpService,
              private modalService: NgbModal,
              private alertService: AlertService,
              private trainingService: TrainingService) { }

  ngOnInit() {
    this.addTrainingForm = this.formBuilder.group({
      superSetList: [[], Validators.required],
      name: ['', Validators.required],
      user: [JSON.parse(localStorage.getItem('currentUser')), Validators.required],
      date: [new Date(), Validators.required],
      difficulty: [this.difficulty, Validators.required]
    });
  }

  get f() { return this.addTrainingForm.controls; }

  onSubmit() {
    if (localStorage.getItem('activeForm') === 'training-add' || localStorage.getItem('activeForm') === null) {
      this.submitted = true;
      this.f.difficulty.setValue(this.difficulty);
      this.f.superSetList.setValue(this.trainingService.getSuperSets());
      if (this.addTrainingForm.invalid) {
        return;
      }

      this.loading = true;
      console.log(this.addTrainingForm.value);
      this.httpService.createTraining(this.addTrainingForm.value, parseInt(localStorage.getItem('tempUserId'), 10))
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success('Training created successfull', true);
            this.close();
            this.loading = false;
            this.trainingService.getTrainingsByUser(parseInt(localStorage.getItem('tempUserId'), 10));
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
      this.trainingService.getTrainingsByUser(parseInt(localStorage.getItem('tempUserId'), 10));
      }
  }

  open(content) {
    localStorage.setItem('activeForm', 'training-add');
    this.modalReference = this.modalService.open(content, {size: 'lg'});
  }

  close() {
    localStorage.removeItem('activeForm');
    this.modalReference.close();
  }

  formatLabel(value: number) {
    if (value >= 10) {
      return Math.round(value / 10) + 'k';
    }

    return value;
  }

}
